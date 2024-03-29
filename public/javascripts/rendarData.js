function getRenderData(auth, out, index = 0, obj) {
    if (out == 'index') {
        if (obj != undefined) {
            return Object.assign({
                title: 'ホーム',
                isAuth: auth,
                mainThread: 'home',
                mainThreadId: 1,
                subThreads: [{ name: 'トップページ' }, { name: '全体連絡' }, { name: 'カレンダー' }],
                subThreadIndex: index,
                urls: ['/', '/general', '/calendar']
            }, obj);
        }
        return {
            title: 'ホーム',
            isAuth: auth,
            mainThread: 'home',
            mainThreadId: 1,
            subThreads: [{ name: 'トップページ' }, { name: '全体連絡' }, { name: 'カレンダー' }],
            subThreadIndex: index,
            urls: ['/', '/general', '/calendar']
        }
    } else if (out == 'manage') {
        if (obj != undefined) {
            return Object.assign({
                title: '管理機能',
                isAuth: auth,
                mainThread: 'manage',
                mainThreadId: 5,
                subThreads: [{ name: '研究室管理ページ' }, { name: 'カレンダー編集' }],
                subThreadIndex: index,
                urls: ['/assignlabs', '/manageCalendar'],
            }, obj);
        }
        return {
            title: '管理機能',
            isAuth: auth,
            mainThread: 'manage',
            mainThreadId: 5,
            subThreads: [{ name: '研究室管理ページ' }, { name: 'カレンダー編集' }],
            subThreadIndex: index,
            urls: ['/assignlabs', '/manageCalendar'],
        }
    }
}

module.exports = {
    getRenderData
}