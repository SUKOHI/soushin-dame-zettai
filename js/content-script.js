// 定数
const BACKGROUND_COLOR = '#d1ffd5';
const TEXT_COLOR = '#000';

// ヘルパー関数
const dd = console.log; // for TEST
const isCombinationKey = e => { // 組み合わせキーが押されているか

    return e.ctrlKey || e.shiftKey || e.altKey;

};

// Teams
const initTeams = () => {

    window.addEventListener('load', () => {

        setTimeout(() => {

            setTeamsEvents();

        }, 3000); // Teams は遅いので 3 秒待つ

    });

};
const setTeamsEvents = () => {

    const elements = document.querySelectorAll('[contenteditable="true"]');

    [].forEach.call(elements, el => {

        el.style.backgroundColor = BACKGROUND_COLOR;
        el.style.color = TEXT_COLOR;
        el.addEventListener('keydown', e => {

            if (e.key === 'Enter') {

                if(! e.ctrlKey && ! e.shiftKey && ! e.altKey) {

                    insertLineBreakOnTeams();

                }

                e.stopPropagation();

            }

        }, true);

    });

};
const insertLineBreakOnTeams = () => {

    const selection = window.getSelection();

    if (selection.rangeCount > 0) {

        const range = selection.getRangeAt(0);
        range.deleteContents();

        const br = document.createTextNode("\n");
        range.insertNode(br);

        const newRange = document.createRange();
        newRange.setStartAfter(br);
        newRange.setEndAfter(br);
        selection.removeAllRanges();
        selection.addRange(newRange);

    }

};

// Slack
const initSlack = () => {

    window.addEventListener('load', () => {

        setTimeout(() => {

            setSlackEvents();

        }, 1000);

    });

};
const setSlackEvents = () => {

    const elements = document.querySelectorAll('[contenteditable="true"]');

    [].forEach.call(elements, el => {

        el.style.backgroundColor = BACKGROUND_COLOR;
        el.style.color = TEXT_COLOR;
        el.addEventListener('keydown', e => {

            if (e.key === 'Enter') {

                e.stopPropagation();

                // Enter + Shift が送信なので入力内容の改変は不要

            }

        }, true);

    });

};

// Chatwork
const initChatwork = () => {

    window.addEventListener('load', () => {

        setTimeout(() => {

            setChatworkEvents();

        }, 1000);

    });

};
const setChatworkEvents = () => {

    const elements = document.querySelectorAll('textarea');

    [].forEach.call(elements, el => {

        el.style.backgroundColor = BACKGROUND_COLOR;
        el.style.color = TEXT_COLOR;
        el.addEventListener('keydown', e => {

            if (e.key === 'Enter') {

                if(! isCombinationKey(e)) {

                    e.preventDefault();
                    insertLineBreakOnChatwork(e);

                }

                e.stopPropagation();

            }

        });

    });

};
const insertLineBreakOnChatwork = (e) => {

    const el = e.target;
    const currentText = el.value;
    const selectionStart = el.selectionStart;
    const selectionEnd = el.selectionEnd;
    const lineBreak = "\n";

    const textBefore = currentText.substring(0, selectionStart);
    const textAfter = currentText.substring(selectionEnd, currentText.length);

    el.value = textBefore + lineBreak + textAfter;

    const newPosition = selectionStart + lineBreak.length;
    el.selectionStart = newPosition;
    el.selectionEnd = newPosition;

}

// 初期化
const init = () => {

    const hostName = window.location.hostname;
    const initFunctions = {
        'teams.microsoft.com': initTeams,
        'app.slack.com': initSlack,
        'www.chatwork.com': initChatwork,
    };
    const initFunction = initFunctions[hostName];

    if(typeof initFunction === 'function') {

        initFunction(); // 該当する初期化関数だけ実行

    }

};

init();
