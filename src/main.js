const app = {
    host: location.host,
    pathname: location.pathname,
    observer: null,
    init(){
        this.onMutationObserver();
    },

    dispatchInputEmit: function (element, isReact) {
        let event = new Event('input', { bubbles: true });
        if(isReact){
            event.simulated = true;
            let tracker = element._valueTracker;
            if (tracker) {
                tracker.setValue(element);
            }
        }
        element.dispatchEvent(event);
    },

    onMutationObserver(){
        let that = this;
        let observe = new MutationObserver(function(mutations, observer) {
            for (let mutation in mutations) {
                let element = mutations[mutation];
                that.pathname = location.pathname;
                // github
                if(that.host === 'github.com'){
                    if(element.target.id === 'repo-delete-warning-container'){
                        let $verificationField = document.querySelector('#verification_field');
                        if($verificationField){
                            $verificationField.value = $verificationField.getAttribute('data-repo-nwo');
                            document.querySelector('#repo-delete-proceed-button').disabled = false;
                            that.dispatchInputEmit($verificationField, true)
                        }
                    }
                }
                // gitee
                if(that.host === 'gitee.com'){
                    if(element.target && element.target.classList.contains("fade")){
                        let $pathWithNamespace = document.querySelector('#path_with_namespace');
                        if($pathWithNamespace){
                            $pathWithNamespace.value = document.querySelector('.highlight-black').innerText;
                            that.dispatchInputEmit($pathWithNamespace)
                        }
                    }
                }
                // codeup.aliyun.com
                if(that.host === 'codeup.aliyun.com'){
                    if(element.target.classList.contains('next-overlay-inner')){
                        let $nextOverlayWrapper = document.querySelector('.next-overlay-wrapper');
                        let $deletePathResourceName = $nextOverlayWrapper.querySelector('.delete-path-resource-name');
                        let $name = $nextOverlayWrapper.querySelector('#name');
                        let $reason = $nextOverlayWrapper.querySelector('#reason');
                        if($name){
                            let $targetName = $deletePathResourceName.querySelector('label');
                            $name.value = $targetName.innerText.split(' ')[1];
                            that.dispatchInputEmit($name, true);
                            $reason.value = '确认删除';
                            that.dispatchInputEmit($reason, true);
                        }
                    }
                }
                // vercel.com
                if(that.host === 'vercel.com'){
                    if(element.target.nodeName.toLowerCase() == 'reach-portal'){
                        let $modalInsetWrapper = document.querySelector('div[data-geist-modal-inset]');
                        let $labelPB = $modalInsetWrapper.querySelectorAll('label p b');
                        let $resourceName = $modalInsetWrapper.querySelector('input[name=resourceName]');
                        let $verificationText = $modalInsetWrapper.querySelector('input[name=verificationText]');
                        if($resourceName){
                            $resourceName.value = $labelPB[0].innerText;
                            that.dispatchInputEmit($resourceName, true);
                            $verificationText.value = $labelPB[1].innerText;
                            that.dispatchInputEmit($verificationText, true);
                        }
                    }
                }
                // dash.cloudflare.com
                if(that.host === 'dash.cloudflare.com'){
                    if(element.target.nodeName.toLowerCase() == 'div' && element.target.querySelector('#focusFallback')){
                        let $focusFallback = element.target.querySelector('#focusFallback');
                        let $productionName = $focusFallback.querySelector('form>div strong>span');
                        let $deletionChallenge = $focusFallback.querySelector('input[id=deletionChallenge]');
                        if($productionName){
                            $deletionChallenge.value = $productionName.innerText;
                            that.dispatchInputEmit($deletionChallenge, true);
                        }
                    }
                }
                // www.jianguoyun.com
                if(that.host === 'www.jianguoyun.com'){
                    if(element.target.nodeName.toLowerCase() == 'div' && element.target.querySelector('.ivu-modal')){
                        let $ivuModal = element.target.querySelector('.ivu-modal');
                        let $deleteInput = $ivuModal.querySelector('input[placeholder=DELETE]');
                        if($deleteInput){
                            $deleteInput.value = 'DELETE';
                            that.dispatchInputEmit($deleteInput, true);
                        }
                    }
                }
                // www.cursor.com
                if(that.host === 'www.cursor.com'){
                    if(element.target.nodeName.toLowerCase() == 'div' && element.target.querySelector('.fixed>.relative.w-\\[500px\\]')){
                        let $deleteModal = element.target.querySelector('.fixed>.relative.w-\\[500px\\]');
                        let $deleteInput = $deleteModal.querySelector("input[placeholder='Type \\'Delete\\' to confirm']");
                        if($deleteInput){
                            $deleteInput.value = 'Delete';
                            that.dispatchInputEmit($deleteInput, true);
                        }
                    }
                }
                // 1panel
                if(that.pathname === '/websites'){
                    if(element.target.querySelector('.el-dialog')){
                        if(element.target.querySelector('.el-dialog__title').innerText.indexOf('删除') > -1){
                            let $dialog = element.target.querySelector('.el-dialog');
                            let $input = $dialog.querySelector('.el-input__inner[type=text]');
                            if($input){
                                $input.value = $input.getAttribute('placeholder');
                                that.dispatchInputEmit($input, true);
                            }
                        }
                    }
                }
                // bt: 8.0.53
                if(that.pathname === '/site_ifame'){
                    if(element.target.querySelector('.delete_site_layer')){
                        if(element.target.querySelector('.layui-layer-title').innerText.indexOf('删除') > -1){
                            let $deleteSiteLayer = element.target.querySelector('.delete_site_layer');
                            let $vcodeText = $deleteSiteLayer.querySelector('.vcode>span.text');
                            let $vcodeResult = $deleteSiteLayer.querySelector('#vcodeResult');
                            if($vcodeResult){
                                let $textArr = $vcodeText.innerText.split(' + ');
                                $vcodeResult.value = parseInt($textArr[0]) + parseInt($textArr[1]);
                            }
                        }
                    }
                }
            }
        });

        observe.observe(document.querySelector('body'), {
            childList: true,
            subtree: true,
            attributes: true,
        });
    }
}

app.init()
