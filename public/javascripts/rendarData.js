function getRenderData(auth, out, obj) {
    if(out == 'index') {
        return {
            title: 'ホーム',
            isAuth: auth,
            mainThread: 'home',
            subThreads: ['トップページ', '全体連絡', 'カレンダー'],
            subThreadIndex: '0',
            urls: ['/', '/general', '/calendar']
        }
    } else if(out == 'manage') {
        if(obj != undefined) {
            return Object.assign({
                title: '管理機能',
                isAuth: auth,
                mainThread: 'manage',
                subThreads: ['研究室管理ページ', 'カレンダー編集'],
                subThreadIndex: 0,
                urls: ['/assignlabs', '/manageCalendar'],
            }, obj);
        }
        return {
            title: '管理機能',
            isAuth: auth,
            mainThread: 'manage',
            subThreads: ['研究室管理ページ', 'カレンダー編集'],
            subThreadIndex: 0,
            urls: ['/assignlabs', '/manageCalendar'],
        }
    }
    

}

module.exports = {
    getRenderData
}