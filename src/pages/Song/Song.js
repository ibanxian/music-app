import React, { Component } from 'react'
import { connect } from "react-redux"
// 引入仓库
import { songurl, reqSongUrlAction } from '../../store/modules/song'
class Song extends Component {
    constructor() {
        super();
        this.state = {
            isok: false // 定义开关
        }
        this.audiou = React.createRef()
    }
    componentDidMount() {
        const { reqSongUrl } = this.props
        let id = this.props.match.params.id
        reqSongUrl(id) // 触发音乐url
    }
    // 开始
    onPlay() {
        this.setState({
            isok: !this.state.isok
        }, () => {
            console.log(this.state.isok);
            let audio = this.audiou.current
            if (this.state.isok) {
                audio.play() // 播放
            } else {
                audio.pause() //暂停
            }

        })



    }
    render() {
        const { isok } = this.state
        const { songurl } = this.props
        return (
            <div className="song">
                <div className="song_bg" style={{ backgroundImage: `url("//music.163.com/api/img/blur/109951165317445294")` }}></div>
                <div className="back">&lt;</div>
                <div className="song_wrap" onClick={() => this.onPlay()}>
                    <div className={isok ? "song_disc circling" : "song_disc"}>
                        <div className="song_turn">
                            <div className="song_rollwrap">
                                <div className={isok ? "song_img song_circling" : "song_img"}>
                                    <img src="http://p1.music.126.net/6ycE3DNpozUcMOVuCHy7_w==/109951165317445294.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0" alt="" />
                                </div>
                            </div>
                            <div className="song_lgour">
                                <div className={isok ? "song_light song_circling" : "song_light"}></div>
                            </div>
                        </div>
                        {isok ? null : <div className="song_plybtn"></div>}
                    </div>
                </div>
                {/* 播放器 */}
                {songurl ? <audio controls="controls" autoplay preload="auto" ref={this.audiou}>
                    <source src={songurl} type="audio/mp3" />
                </audio> : null}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        songurl: songurl(state)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        reqSongUrl: (id) => dispatch(reqSongUrlAction(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Song)