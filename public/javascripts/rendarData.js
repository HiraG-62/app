function getRenderData(auth, out, index=0, obj) {
    if(out == 'index') {
        return {
            title: 'ホーム',
            isAuth: auth,
            mainThread: 'home',
            subThreads: ['トップページ', '全体連絡', 'カレンダー'],
            subThreadIndex: index,
            urls: ['/', '/general', '/calendar']
        }
    } else if(out == 'manage') {
        if(obj != undefined) {
            return Object.assign({
                title: '管理機能',
                isAuth: auth,
                mainThread: 'manage',
                subThreads: ['研究室管理ページ', 'カレンダー編集'],
                subThreadIndex: index,
                urls: ['/assignlabs', '/manageCalendar'],
            }, obj);
        }
        return {
            title: '管理機能',
            isAuth: auth,
            mainThread: 'manage',
            subThreads: ['研究室管理ページ', 'カレンダー編集'],
            subThreadIndex: index,
            urls: ['/assignlabs', '/manageCalendar'],
        }
    }
    

}

module.exports = {
    getRenderData
}