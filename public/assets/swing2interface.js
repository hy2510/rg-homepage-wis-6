var swingWebViewPlugin = {
    init:function() {
        try
        {
            window.addEventListener('load', function() {

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' ||
                    swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.showClass('s2p-only-mobile-visible');
                    swingWebViewPlugin.utils.hideClass('s2p-only-web-visible');
                }
                else {
                    swingWebViewPlugin.utils.hideClass('s2p-only-mobile-visible');
                    swingWebViewPlugin.utils.showClass('s2p-only-web-visible');
                }

            });

            if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
            {
                if( window.swingDeviceStart == null )
                {
                    swingWebViewPlugin.app.methods.getAppVersion(function(value){
                        var appVersion = JSON.parse(value);
                        if( swingDeviceScript.appId == '5e8bccff-b3ab-45cf-8f10-85b73e572fb6' && appVersion.appVersion < '3.0')
                        {
                            swingWebViewPlugin.checkUpdate('IOS',swingDeviceScript.appId,appVersion.appVersion,appVersion.bundleID);
                        }
                    });
                }
            }
        }
        catch (ex){}
    },
    requestCall : function( url, method , parameter, callback , errorcallback)
    {
        const xhr = new XMLHttpRequest();
        // listen for `load` event
        xhr.onload = () => {
            // print JSON response
            if (xhr.status >= 200 && xhr.status < 300) {
                // parse JSON
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(response)
            }
            else
            {
                errorcallback();
            }
        };
        // create a JSON object
        if( parameter == null )
        {
            parameter = [];
        }

        const data = parameter;

        // open request
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(Object.keys(data).map(key => `${key}=${data[key]}`).join('&'));
    },
    checkUpdate : function(platform,appId,currentVersion,appUniqueId) {
        if( $.ajax != null )
        {
            $.ajax({
                url: 'https://www.swing2app.com/mobile/version-check',
                type: "get",
                dataType: "json",
                data : {
                    appId : appId,
                    currentVersion : currentVersion,
                    platform : platform
                },
                success: function (initVersionUpdateModel) {
                    if( parseFloat(initVersionUpdateModel.version.version_value) > parseFloat(currentVersion) )
                    {
                        var updateFlag = initVersionUpdateModel.version.update_flag;
                        if( updateFlag == 'W' ) // soft update option
                        {
                        }
                        else if( updateFlag == 'S' )  // soft update required
                        {

                        }
                        else
                        {
                            console.log('run checking update');
                            $.ajax({
                                url: 'https://www.swing2app.com/v2_2015_11_21/common/check_hard_update',
                                type: "get",
                                dataType: "json",
                                data : {
                                    current_version: currentVersion,
                                    app_unique_id : appUniqueId,
                                    platform : platform
                                },
                                success: function (update) {
                                    if( update.result )
                                    {
                                        $.ajax({
                                            url: 'https://www.swing2app.com/mobile/version-check',
                                            type: "get",
                                            dataType: "json",
                                            data : {
                                                appId : appId,
                                                currentVersion : currentVersion,
                                                latestVersion : update.version,
                                                platform : platform
                                            },
                                            success: function (model) {
                                                if( parseFloat(model.version.version_value) > parseFloat(currentVersion) )
                                                {
                                                    if( model.version.update_flag != 'I' )
                                                    {
                                                        if( model.version.update_flag == 'M' )
                                                        {
                                                            if( navigator.languages != null && navigator.languages.indexOf('KR') >= 0 )
                                                            {
                                                                alert('필수 업데이트 버전이 출시되었습니다. 지금 업데이트를 진행하겠습니다.')
                                                                swingWebViewPlugin.app.methods.doExternalOpen(update.trackViewUrl);
                                                            }
                                                            else {
                                                                alert('Required update version already exists. We will proceed with the update.')
                                                                swingWebViewPlugin.app.methods.doExternalOpen(update.trackViewUrl);
                                                            }
                                                        }
                                                        else if( model.version.update_flag == 'O' )
                                                        {
                                                            if( navigator.languages != null && navigator.languages.indexOf('KR') >= 0 )
                                                            {
                                                                alert('최신버전이 출시되었습니다. 지금 업데이트를 하시겠습니까?')
                                                                swingWebViewPlugin.app.methods.doExternalOpen(update.trackViewUrl);
                                                            }
                                                            else {
                                                                alert('The latest version is out. Would you like to update now?')
                                                                swingWebViewPlugin.app.methods.doExternalOpen(update.trackViewUrl);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                }
            });
        }
    },
    backend : {
        api : {
            sendPushNotificationWithUrl :function( appId , url ) {
            }
        }
    },
    callbackStore : {},
    eventStore : {},
    event :  {
        addEvent: function(eventName , callback)
        {
            swingWebViewPlugin.eventStore[eventName] = callback;
        },
        removeEvent : function(eventName)
        {
            swingWebViewPlugin.eventStore[eventName] = null;
        },
        onLog : function(log)
        {
            console.log(log);
        }
    },
    callBackInterfaceByApp : function(callbackName , params )
    {
        var callbackFunc = swingWebViewPlugin.callbackStore[callbackName];
        if( callbackFunc != null )
        {
            callbackFunc(params);
        }
    },
    app : {
        readyForLogicModule:function(appId)
        {

        },
        navigateBack : function() {
            if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
            {
                SwingJavascriptInterface.navigateBack();
            }
            else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
            {
                swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.navigateBack', {} , null , null);
            }

        },
        navigateToHome : function() {
            if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
            {
                SwingJavascriptInterface.goHome();
            }
            else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
            {
                swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.goHome', {} , null , null);
            }
        },
        ui : {
            openPopupDialog:function(titleCaption,messageCaption,confirmCaption,cancelCaption,confirmCallback,cancelCallback) {
                // 이미 팝업이 존재하는지 확인
                var existingPopup = document.getElementById('swing2app-webview-popup');
                if (existingPopup) {
                    // 이미 팝업이 있으면, 다시 표시하지 않고 함수 종료
                    existingPopup.remove();
                    return;
                }

                document.body.classList.add('no-scroll');

                var title = titleCaption;
                var message = messageCaption;
                // 팝업 HTML 구조를 생성
                var popupHTML = ` <div class="swing2app-webview-popup overlay" id="swing2app-webview-popup"> <div class="popup"> <h2>${title}</h2> <p>${message}</p> ${(confirmCaption == null || confirmCaption === '') ? '' : `<button class="confirm">${confirmCaption}</button>`} ${(cancelCaption == null || cancelCaption === '') ? '' : `<button class="cancel">${cancelCaption}</button>`} </div> </div>`;

                // 팝업 스타일을 생성
                var popupStyles = `.no-scroll {overflow: hidden;} .swing2app-webview-popup.overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; } .swing2app-webview-popup .popup { background: #fff; padding: 20px; border-radius: 0.5em; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); text-align: center; width: 60%; font-size:2.3em } .swing2app-webview-popup .popup button { padding: 30px; margin: 10px; border: 1px solid #bebbbb; border-radius: 10px; cursor: pointer; color: black; background:white; font-size:1em } .swing2app-webview-popup .popup button.confirm { } .swing2app-webview-popup .popup button.cancel { }`;

                // body 태그에 팝업 HTML을 추가
                document.body.insertAdjacentHTML('beforeend', popupHTML);

                // head 태그에 팝업 스타일을 추가 (중복 추가 방지)
                if (!document.getElementById('swing2app-webview-popupStyles')) {
                    var styleSheet = document.createElement("style");
                    styleSheet.id = 'swing2app-webview-popupStyles';
                    styleSheet.type = "text/css";
                    styleSheet.innerText = popupStyles;
                    document.head.appendChild(styleSheet);
                }

                // 이벤트 핸들러를 버튼에 연결
                document.querySelector('.swing2app-webview-popup.overlay .popup .confirm').addEventListener('click', function() {
                    console.log('User confirmed the subscription for notifications.');
                    // 여기에 푸시 구독 로직을 추가할 수 있습니다.
                    closeAdPermissionPopup();
                    if( confirmCallback != null )
                    {
                        confirmCallback();
                    }
                });

                document.querySelector('.swing2app-webview-popup.overlay .popup .cancel').addEventListener('click', function() {
                    console.log('User cancelled the subscription for notifications.');
                    closeAdPermissionPopup();
                    if( cancelCallback != null )
                    {
                        cancelCallback();
                    }
                });

                // 팝업을 닫는 함수
                function closeAdPermissionPopup() {
                    var popup = document.getElementById('swing2app-webview-popup');
                    if (popup) {
                        popup.parentNode.removeChild(popup);
                    }
                    // 스타일 태그 제거
                    var styleTag = document.getElementById('swing2app-webview-popupStyles');
                    if (styleTag) {
                        styleTag.remove();
                    }
                    document.body.classList.remove('no-scroll');

                }
            },
            setIosBackColor : function( backColor )
            {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.setIosBackColor:',
                        {
                            color : backColor
                        },
                        null , null);
                }
            },
            getDeviceUiStyle : function( callback )
            {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getDeviceUiStyle'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.getDeviceUiStyle();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.getDeviceUiStyle',{} , null , null);
                }
            }
        },
        screen : {
            setting : {
                show : function() {
                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.goToSetting();
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.goToSetting', {} , null , null);
                    }
                },
            },
            notificationList : {
                show : function() {
                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.goToNotificationList();
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.goToNotificationList', {} , null , null);
                    }
                },
            },
            menu : {
                show : function() {
                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.showMenu();
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.showMenu', {} , null , null);
                    }
                },
                hide : function() {

                }
            },
            bookmarkList : {
                show : function() {
                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.goToBookmarkList();
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.goToBookmarkList', {} , null , null);
                    }
                },
            },
        },
        webview : {
            updateToolbar : function(isToolbar , isAutoHideToolbar) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.updateAppForToolbar((isToolbar ? "Y" : "N"), (isAutoHideToolbar ? "Y" : "N"));
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.updateAppForToolbar:', {
                        isToolbar : (isToolbar ? "Y" : "N"),
                        isAutoHideToolbar : (isAutoHideToolbar ? "Y" : "N")
                    } , null , null);
                }
            },
            isCanForward : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['isCanForward'] = callback;
                }
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.isCanForward();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.isCanForward', {} , null , null);
                }
            },
            forward : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.forward();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.forward', {} , null , null);
                }
            },
            isCanBack : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['isCanBack'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.isCanBack();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.isCanBack', {} , null , null);
                }
            },
            back:function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.back();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.back', {} , null , null);
                }
            },
            clearWebViewRouteHistory : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.clearWebViewRouteHistory();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.clearWebViewRouteHistory',{} , null , null);
                }
            },
            clearCache : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.clearCache();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.clearCache',{} , null , null);
                }
            },
        },
        methods : {
            activePush : function(){
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.activePush();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.activePush',{} , null , null);
                }
            },
            inactivePush : function(){
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.inactivePush();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.inactivePush',{} , null , null);
                }
            },
            speakOutViaTTS : function(text, callback) {
                if( text == null )
                {
                    return;
                }

                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['speakOutViaTTS'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.speakOutViaTTS(text);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.speakOutViaTTS', {text:text} , null , null);
                }
            },
            requestCallOnApp : function(params , callback )
            {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.requestCallOnApp(JSON.stringify(params));
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.requestCallOnApp:',
                        {param : JSON.stringify(params)} , null , null);
                }

                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['requestCallOnApp'] = callback;
                }

            },
            copyToClipboard : function(text) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    if( window.SwingJavascriptInterface != null )
                    {
                        SwingJavascriptInterface.copyToClipboard(text);
                    }
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.copyToClipboard:',
                        {text : text} , null , null);
                }
                else
                {
                    if( window.navigator.clipboard != null && window.navigator.clipboard.writeText != null )
                    {
                        window.navigator.clipboard.writeText(text)
                    }
                }
            },
            getCurrentPlatform : function() {
                if( window.SwingJavascriptInterface != undefined )
                {
                    return 'android';
                }

                const ios = () => {
                    if (typeof window === `undefined` || typeof navigator === `undefined`) return false;
                    return /iPhone|iPad|iPod/i.test(navigator.userAgent || navigator.vendor || (window.opera && opera.toString() === `[object Opera]`));
                };

                if( ios() ) {
                    let isWKWebView = false;
                    if( window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.observe != null ) {
                        isWKWebView = true;
                        return 'ios';
                    }
                }


                return 'web';

            },
            setVariable : function(key,value) {

                if( key == null )
                {
                    return;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.setVariable(key,value);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.setVariable', {key:key,value:value} , null , null);
                }
            },
            getVariable : function(key,callback) {

                if( key == null )
                {
                    return;
                }

                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getVariable'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.getVariable(key);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.getVariable', {key:key} , null , null);
                }
            },
            getAppVersion : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getAppVersion'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.getAppVersion();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.getAppVersion', {} , null , null);
                }
            },
            getDeviceToken : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getDeviceToken'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.getDeviceToken();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.getDeviceToken', {} , null , null);
                }
            },

            doExitApp : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doExitApp();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doExitApp',{} , null , null);
                }
            },
            doClosePopup : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doClosePopup();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doClosePopup',{} , null , null);
                }
            },

            doExternalOpen : function(url) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doExternalOpen(url);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doExternalOpen:',{url:url} , null , null);
                }
            },
            doBookmark : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doBookmark();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doBookmark', {} , null , null);
                }
            },
            showMenu : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.showMenu();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.showMenu', {} , null , null);
                }
            },
            closeMenu : function() {

            },
            openBrowser: function( url  ) {
                try
                {
                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        window.SwingJavascriptInterface.openBrowser( url );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.openBrowser:',{url:url} , null , null);
                    }
                }
                catch(ex)
                {

                }
            },
            doShareCurrentPage:function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doShare();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doShare', {} , null , null);
                }
            },
            doShareWithUrl:function(url) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doShareWithUrl(url);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doShareWithUrl:',{url : url} , null , null);
                }
            },
            isFirstRun : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['isFirstRun'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.isFirstRun();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.isFirstRun', {} , null , null);
                }
            },
            isNotificationEnabled : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['isNotificationEnabled'] = callback;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.isNotificationEnabled();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.isNotificationEnabled',{} , null , null);
                }
            },
            goToNotificationSetting : function(type){
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.goToNotificationSetting(type);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.goToNotificationSetting:',{type:type} , null , null);
                }
            },
        },
        android: {
            getPermissionForAndroid: function(permissionName,callback)
            {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getPermissionForAndroid'] = callback;
                }

            },
            getAppPackageId : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getAppPackageId'] = callback;
                }

            },
        },
        ios: {
            getAppBundleId : function(callback) {
                if( callback != null )
                {
                    swingWebViewPlugin.callbackStore['getAppBundleId'] = callback;
                }
            },
        },
        login : {
            currentUserId : null,
            currentUserName : null,
            doAppLogin : function( id , userName )
            {
                if( id != null )
                {
                    swingWebViewPlugin.app.login.currentUserId = id;
                }
                if( userName != null )
                {
                    swingWebViewPlugin.app.login.currentUserName = userName;
                }

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doLogin(id,userName);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doLogin:userName:',{id:id,userName:userName} , null , null);
                }
            },
            doAppLogout: function() {

                if( swingWebViewPlugin.app.login.currentUserId == -1 )
                {
                    return;
                }

                swingWebViewPlugin.app.login.currentUserId = -1;
                swingWebViewPlugin.app.login.currentUserName = null;

                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.doLogout();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.doLogout:', {} , null , null);
                }
            }
        },
        permission : {
            android : {
                requestPermission : function(permissionName, callback) {
                    if( callback != null )
                    {
                        swingWebViewPlugin.callbackStore['requestPermission'] = callback;
                    }

                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.requestPermission(permissionName);
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.requestPermission:',{permissionName:permissionName} , null , null);
                    }
                },
                checkPermission : function(permissionName, callback) {
                    if( callback != null )
                    {
                        swingWebViewPlugin.callbackStore['checkPermission'] = callback;
                    }

                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.checkPermission(permissionName);
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.checkPermission:',{permissionName:permissionName} , null , null);
                    }
                }
            },
            ios : {
                requestPermission : function(permissionName, callback) {
                    if( callback != null )
                    {
                        swingWebViewPlugin.callbackStore['requestPermission'] = callback;
                    }

                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.requestPermission(permissionName);
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.requestPermission:',{permissionName:permissionName} , null , null);
                    }
                },
                checkPermission : function(permissionName, callback) {
                    if( callback != null )
                    {
                        swingWebViewPlugin.callbackStore['checkPermission'] = callback;
                    }

                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                    {
                        SwingJavascriptInterface.checkPermission(permissionName);
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.checkPermission:',{permissionName:permissionName} , null , null);
                    }
                }
            }

        },
        firebase : {
            doGa4Logging : function() {

            },
            logEvent : function (name, params){

            },
            setUserProperty : function(name, value) {

            }
        },
        admob : {
            isInit : false,
            values : {},
            init:function() {

                if( !(window.swingDeviceStart != null && window.swingDeviceStart.appId != '') )
                {
                    return;
                }

                swingWebViewPlugin.requestCall('https://www.swing2app.com/v2_2015_11_21/app/app-plugin-custom-codes', 'post',
                    {
                        appId : swingDeviceStart.appId ,
                        pluginId : 'custom_admob_custom_plugin',
                        code : '',
                    },
                    function(admobCodeResult){

                        for( var codeIdx = 0; codeIdx < admobCodeResult.length; codeIdx++ ) {
                            if (admobCodeResult[codeIdx].code_name == 'ADD_RUN_CODE') {
                                swingWebViewPlugin.app.admob.values.addRunCode = admobCodeResult[codeIdx].code_value;
                            } else if (admobCodeResult[codeIdx].code_name == 'AND-IS-BN') {
                                if (admobCodeResult[codeIdx].code_value == 'N') {
                                    swingWebViewPlugin.app.admob.values.isAndBannerAd = false;
                                }
                                else {
                                    swingWebViewPlugin.app.admob.values.isAndBannerAd = true;
                                }
                            } else if (admobCodeResult[codeIdx].code_name == 'AND-IS-IT') {
                                if (admobCodeResult[codeIdx].code_value == 'N') {
                                    swingWebViewPlugin.app.admob.values.isAndInitAd = false;
                                }
                                else {
                                    swingWebViewPlugin.app.admob.values.isAndInitAd = true;
                                }
                            } else if (admobCodeResult[codeIdx].code_name == 'IOS-IS-BN') {
                                if (admobCodeResult[codeIdx].code_value == 'N') {
                                    swingWebViewPlugin.app.admob.values.isIosBannerAd = false;
                                }
                                else {
                                    swingWebViewPlugin.app.admob.values.isIosBannerAd = true;
                                }
                            } else if (admobCodeResult[codeIdx].code_name == 'IOS-IS-IT') {
                                if (admobCodeResult[codeIdx].code_value == 'N') {
                                    swingWebViewPlugin.app.admob.values.isIosInitAd = false;
                                }
                                else {
                                    swingWebViewPlugin.app.admob.values.isIosInitAd = true;
                                }
                            } else if (admobCodeResult[codeIdx].code_name == 'IT_CODE') {
                                swingWebViewPlugin.app.admob.values.andInitCode = admobCodeResult[codeIdx].code_value;
                            } else if (admobCodeResult[codeIdx].code_name == 'BN_CODE') {
                                swingWebViewPlugin.app.admob.values.andBannerCode = admobCodeResult[codeIdx].code_value;
                            } else if (admobCodeResult[codeIdx].code_name == 'IOS_BN_CODE') {
                                swingWebViewPlugin.app.admob.values.iosBannerCode = admobCodeResult[codeIdx].code_value;
                            } else if (admobCodeResult[codeIdx].code_name == 'IOS_IT_CODE') {
                                swingWebViewPlugin.app.admob.values.iosInitCode = admobCodeResult[codeIdx].code_value;
                            }
                        }

                        if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                        {
                            if( swingWebViewPlugin.app.admob.values.isAndBannerAd != null &&
                                swingWebViewPlugin.app.admob.values.isAndBannerAd )
                            {
                                swingWebViewPlugin.app.admob.showBanner(swingWebViewPlugin.app.admob.values.andBannerCode);
                            }
                            if( swingWebViewPlugin.app.admob.values.isAndInitAd != null && swingWebViewPlugin.app.admob.values.isAndInitAd )
                            {
                                swingWebViewPlugin.app.admob.showInterstitialAd(swingWebViewPlugin.app.admob.values.andInitCode);
                            }
                        }
                        else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                        {
                            if( swingWebViewPlugin.app.admob.values.isIosBannerAd != null &&
                                swingWebViewPlugin.app.admob.values.isIosBannerAd )
                            {
                                swingWebViewPlugin.app.admob.showBanner(swingWebViewPlugin.app.admob.values.iosBannerCode);
                            }
                            if( swingWebViewPlugin.app.admob.values.isIosInitAd != null
                                && swingWebViewPlugin.app.admob.values.isIosInitAd )
                            {
                                swingWebViewPlugin.app.admob.showInterstitialAd(swingWebViewPlugin.app.admob.values.iosInitCode);
                            }
                        }

                    }, function() {

                    });
            },
            showBanner : function(adId) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.showBanner(adId);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.showBanner:',{adId:adId} , null , null);
                }
            },
            closeBanner : function() {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.closeBanner();
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.closeBanner',[] , null , null);
                }
            },
            showInterstitialAd : function(adId) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.showInitAd(adId);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.showInitAd:',{adId:adId} , null , null);
                }
            },
            showRewardAd : function(adId) {
                if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'android' )
                {
                    SwingJavascriptInterface.showRewardAd(adId);
                }
                else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                {
                    swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.showRewardAd:',{adId:adId} , null , null);
                }
            },
            hideRewardAd : function() {

            }
        },
        inapp : {
            receiptCallBack : null,
            receiptFailCallBack : null,
            buyCallBack : null,
            buyFailCallBack : null,
            subscribeCallBack : null,
            subscribeFailCallBack : null,
            restorePurchasesCallBack : null,
            restorePurchasesFailCallBack : null,
            restorePurchases: function(type, callback) {
                try
                {
                    this.restorePurchasesCallBack = callback;
                    if( window.SwingJavascriptInterface != undefined )
                    {
                        window.SwingJavascriptInterface.restorePurchases( type );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.restorePurchases',{} , null , null);
                    }
                }
                catch(ex)
                {

                }
            },
            getReceipt: function(callback, failCallBack) {
                try
                {
                    this.receiptCallBack = callback;
                    this.receiptFailCallBack = failCallBack;

                    if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.getReceipt',{} , null , null);
                    }
                }
                catch(ex)
                {

                }
            },
            buyAndType: function(productId, type,callback) {
                try
                {
                    if( !(type == 'consume' || type == 'none-consume') )
                    {
                        return;
                    }

                    this.buyCallBack = callback;
                    if( window.SwingJavascriptInterface != undefined )
                    {
                        window.SwingJavascriptInterface.buy( productId,type );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.buy:',{productId:productId} , null , null);
                    }

                }
                catch(ex)
                {

                }
            },
            buy: function(productId, callback) {
                try
                {
                    this.buyCallBack = callback;
                    if( window.SwingJavascriptInterface != undefined )
                    {
                        window.SwingJavascriptInterface.buy( productId );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.buy:',{productId:productId} , null , null);
                    }

                }
                catch(ex)
                {

                }
            },
            subscribe: function(productId, callback) {
                try
                {
                    this.buyCallBack = callback;
                    if( window.SwingJavascriptInterface != undefined )
                    {
                        window.SwingJavascriptInterface.subscribe( productId );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.subscribe:',{productId:productId} , null , null);
                    }

                }
                catch(ex)
                {

                }
            },
            autoSubscribe: function(productId, callback) {
                try
                {
                    this.buyCallBack = callback;
                    if( window.SwingJavascriptInterface != undefined )
                    {
                        window.SwingJavascriptInterface.subscribe( productId );
                    }
                    else if( swingWebViewPlugin.app.methods.getCurrentPlatform() == 'ios' )
                    {
                        swingWebViewPlugin.utils.calliOSFunction('SwingJavascriptModule.autoSubscribe:',{productId:productId} , null , null);
                    }

                }
                catch(ex)
                {

                }
            },
        }
    },
    utils : {
        hideClass : function(className) {
            var elements = document.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = 'none';
            }
        },
        showClass : function(className) {
            var elements = document.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i++) {
                elements[i].style.display = ''; // 기본값으로 설정하여 화면에 표시
            }
        },
        calliOSFunction : function(functionName, args, successCallback, errorCallback)
        {
            if( window.webkit != null && window.webkit != undefined )
            {
                var callParams = {
                    function_name : functionName,
                }

                var obj = args;
                var keys = Object.keys(obj);
                var values = Object.values(obj);

                console.log("결과1:"+keys);
                console.log("결과2:"+values);

                for(var i=0; i < keys.length; i++){
                    callParams[keys[i]] = args[keys[i]]
                }

                window.webkit.messageHandlers.observe.postMessage(callParams);
            }
            else {
                var url = "swing2ios://";
                var callInfo = {};
                callInfo.functionname = functionName;
                if (successCallback)
                {
                    callInfo.success = successCallback;
                }
                if (errorCallback)
                {
                    callInfo.error = errorCallback;
                }
                if (args)
                {
                    args.functionName = functionName;
                    callInfo.args = args;
                }

                var jsonParameter = JSON.stringify(callInfo);

                url += encodeURIComponent(jsonParameter);

                openCustomURLinIFrame(url);
            }
        },

        openCustomURLinIFrame : function(src)
        {
            var rootElm = document.documentElement;
            var newFrameElm = document.createElement("IFRAME");
            newFrameElm.setAttribute("src",src);
            rootElm.appendChild(newFrameElm);
            //remove the frame now
            newFrameElm.parentNode.removeChild(newFrameElm);
        }
    }
}
swingWebViewPlugin.init();


