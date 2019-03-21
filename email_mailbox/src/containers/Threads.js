import { connect } from 'react-redux';
import {
  loadApp,
  loadEvents,
  loadThreads,
  filterThreadsOrLoadMoreByUnread,
  startLoadThread,
  removeThreads
} from '../actions/index';
import { getEmailsByLabelIds } from './../utils/ipc';
import ThreadsView from '../components/ThreadsWrapper';
import { ButtonSyncType } from '../components/ButtonSync';
import { EmptyMailboxStatus } from '../components/EmptyMailbox';
import { LabelType } from './../utils/electronInterface';
import { defineRejectedLabels } from '../utils/EmailUtils';
import { toLowerCaseWithoutSpaces } from './../utils/StringUtils';
import { storeValue } from '../utils/storage';
import string from './../lang';
import { List } from 'immutable';

const defineSyncStatus = isSyncing => {
  return isSyncing ? ButtonSyncType.LOAD : ButtonSyncType.STOP;
};

const defineMailboxStatus = (isLoadingThreads, mailboxSize) => {
  if (isLoadingThreads && !mailboxSize) return EmptyMailboxStatus.LOADING;
  return EmptyMailboxStatus.EMPTY;
};

const defineContactType = (labelId, from, to) => {
  if (from || to) {
    if (from && to) return ['from', 'to'];
    else if (from) return ['from'];
    return ['to'];
  }

  if (labelId === LabelType.sent.id || labelId === LabelType.draft.id) {
    return ['to', 'cc'];
  }
  return ['from'];
};

const mapStateToProps = (state, ownProps) => {
  const mailboxIdText = toLowerCaseWithoutSpaces(ownProps.mailboxSelected.text);
  const mailboxTitle =
    string.labelsItems[mailboxIdText] || ownProps.mailboxSelected.text;
  const switchUnreadThreadsStatus = state
    .get('activities')
    .get('isFilteredByUnreadThreads');
  const buttonSyncStatus = defineSyncStatus(
    state.get('activities').get('isSyncing')
  );
  const isLoadingThreads = state.get('activities').get('isLoadingThreads');
  const mailbox = state.get('threads').get(`${ownProps.mailboxSelected.id}`);
  const threads = mailbox ? mailbox.get('list') : List([]);
  const unreadThreads = threads.filter(thread => thread.get('unread'));
  const mailboxStatus = defineMailboxStatus(isLoadingThreads, threads.size);
  return {
    buttonSyncStatus,
    currentUnreadThreadsLength: unreadThreads.size,
    isLoadingThreads,
    mailboxTitle,
    mailboxStatus,
    switchUnreadThreadsStatus,
    threads: switchUnreadThreadsStatus ? unreadThreads : threads
  };
};

const defineParamsToLoadThread = (
  mailbox,
  clear,
  searchParams,
  date,
  threadIdRejected,
  unread
) => {
  const labelId = mailbox.id;
  const contactTypes = defineContactType(
    labelId,
    searchParams ? searchParams.from : null,
    searchParams ? searchParams.to : null
  );
  const rejectedLabelIds = defineRejectedLabels(labelId);
  const contactFilter = searchParams
    ? { from: searchParams.from, to: searchParams.to }
    : undefined;
  let plain, text, subject;
  if (searchParams) {
    text = searchParams.text;
    subject = searchParams.subject;
    plain = !!searchParams.text;
  }
  const params =
    mailbox.text === 'Search'
      ? {
          labelId,
          clear,
          date,
          contactTypes,
          contactFilter,
          plain,
          text,
          subject,
          rejectedLabelIds,
          threadIdRejected
        }
      : {
          labelId,
          clear,
          date,
          contactTypes,
          rejectedLabelIds,
          threadIdRejected,
          unread
        };
  return params;
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadApp: (mailbox, clear) => {
      const params = defineParamsToLoadThread(mailbox, clear);
      dispatch(loadApp(params));
    },
    onLoadEvents: () => {
      dispatch(loadEvents({}));
    },
    onLoadThreads: (
      mailbox,
      clear,
      searchParams,
      date,
      threadIdRejected,
      unread
    ) => {
      dispatch(startLoadThread());
      const params = defineParamsToLoadThread(
        mailbox,
        clear,
        searchParams,
        date,
        threadIdRejected,
        unread
      );
      dispatch(loadThreads(params)).then(async () => {
        if (mailbox === 'search' && params.plain) {
          await storeValue(params.text);
        }
      });
    },
    onUnreadToggle: (
      checked,
      currentUnreadThreadsLength,
      mailbox,
      loadParams
    ) => {
      const labelId = mailbox.id;
      const rejectedLabelIds = defineRejectedLabels(labelId);
      const contactTypes = defineContactType(labelId, null, null);
      const paramsToLoadMoreThreads = {
        ...loadParams,
        labelId,
        rejectedLabelIds,
        contactTypes
      };
      dispatch(
        filterThreadsOrLoadMoreByUnread(
          checked,
          currentUnreadThreadsLength,
          paramsToLoadMoreThreads
        )
      ).then(() => true);
    },
    onEmptyTrash: async () => {
      const labelId = LabelType.trash.id;
      const emails = await getEmailsByLabelIds([labelId]);
      const threadsParams = emails.map(email => ({
        threadIdDB: email.threadId
      }));
      dispatch(removeThreads(threadsParams, labelId));
    }
  };
};

const Threads = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThreadsView);

export default Threads;
