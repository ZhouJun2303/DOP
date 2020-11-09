cc.Class({
    extends: cc.Component,

    properties: {
        bgmVolume       : 1.0,
        effectVolume    : 1.0,

        audioID         : -1,
    },

    onLoad :function()
    {
        
    },

    initData : function()
    {
        var b1 = cc.vv.DataManager.getData("musicOpen")
        var b2 = cc.vv.DataManager.getData("effectOpen")
        this.m_musicOpen = (b1 == "true" || b1 == null) ? true : false
        this.m_effectOpen = (b2 == "true" || b2 == null) ? true : false
        console.log("this.m_musicOpen = ", this.m_musicOpen)
        console.log("this.m_effectOpen = ", this.m_effectOpen)

        var bgmVolume = cc.vv.DataManager.getData("bgmVolume")
        this.bgmVolume = bgmVolume != null ? bgmVolume : 0.5
        var effectVolume = cc.vv.DataManager.getData("effectVolume")
        this.effectVolume = effectVolume != null ? effectVolume : 0.5
        this.setMusicVolume(this.bgmVolume)
        console.log("bgmVolume",bgmVolume,"effectVolume",effectVolume)
        if(this.bgmVolume > 0)
        {
            this.m_musicOpen = true
            cc.vv.DataManager.saveData("musicOpen", true)
        }
        this.setEffectVolume(this.effectVolume)
        if(this.effectVolume > 0)
        {
            this.m_musicOpen = true
            cc.vv.DataManager.saveData("effectOpen", true)
        }
    },

    getUrl : function(file)
    {
        return cc.url.raw("resources/" + file)
    },

    playMusic : function(file,restore)
    {
        // var url = this.getUrl(file)
        if(this.m_file == file && restore != true)
        {
            //相同的不播放
            return
        }
        this.m_file = file
        if(this.m_musicOpen == false)
            return

        // cc.audioEngine.stopAll()
        cc.audioEngine.stopMusic();
        var self = this
        cc.loader.loadRes(file, cc.AudioClip, function (err, clip) {
            self.audioID = cc.audioEngine.playMusic(clip, true);
            cc.audioEngine.setMusicVolume(self.bgmVolume)
        });
    },

    setMusicVolume : function(bgmVolume)
    {
        if (bgmVolume == 0)
        {
            this.onMusicSwitch(false)
        }
        else
        {   
            if(this.bgmVolume == 0)
            {
                this.onMusicSwitch(true)
            }
            cc.audioEngine.setMusicVolume(bgmVolume)
        }
        this.bgmVolume = bgmVolume
        cc.vv.DataManager.saveData("bgmVolume", bgmVolume)
    },

    getMusicVolume : function()
    {
        return this.bgmVolume
    },

    playEffect : function(file)
    {
        if(this.m_effectOpen == false)
            return

        //var url = this.getUrl(file)
        if(this.effectVolume > 0)
        {
           //cc.audioEngine.play(url, false, this.effectVolume) 
           cc.loader.loadRes(file, cc.AudioClip, function (err, clip) {
                var audioID = cc.audioEngine.playEffect(clip, false);
            });
        }
    },

    setEffectVolume : function(effectVolume)
    {
        this.effectVolume = effectVolume
        cc.vv.DataManager.saveData("effectVolume", effectVolume)
        if (effectVolume == 0)
        {
            this.onEffectSwitch(false)
        }
        else
        {   
            this.onEffectSwitch(true)
            cc.audioEngine.setEffectsVolume(effectVolume)
        }
    },

    getEffectVolume : function()
    {
        return this.effectVolume
    },

    playClickEffect : function()
    {
        this.playEffect("hall/audio/click_button")
    },

    onMusicSwitch : function(check)
    {
        this.m_musicOpen = check
        if(check)
        {
            this.playMusic(this.m_file,true)
        }else
        {
            cc.audioEngine.stopMusic()
        }
        cc.vv.DataManager.saveData("musicOpen", check)
    },

    onEffectSwitch : function(check)
    {
        this.m_effectOpen = check
        cc.vv.DataManager.saveData("effectOpen", check)
    },
});
