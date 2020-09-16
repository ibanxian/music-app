import { reqSongUrl } from "../../utils/requset"

// 1.初始数据
const initState = {
    songurl: "" // 音乐url
}

// 2.reducer
const reducer = (state = initState, action) => {
    switch (action.type) {
        case "changeSongUrl":
            return {
                ...state,
                songurl: action.songurl
            }
        default:
            return state
    }
}

// 3.action
const changeSongUrlAction = (songurl) => {
    return { type: "changeSongUrl", songurl }
}

// 4.组件触发action
export const reqSongUrlAction = (id) => {
    return (dispatch, getState) => {
        reqSongUrl({ id: id }).then(res => {
            dispatch(changeSongUrlAction(res.data.data[0].url))
        })
    }
}

// 5.导出数据
export const songurl = state => state.song.songurl

export default reducer