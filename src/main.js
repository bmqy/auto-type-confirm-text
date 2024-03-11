const app = {
    host: location.host,
    init(){
        console.log('init', this.host)
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
        let mos = new MutationObserver(function(mutations, observer) {
            for (let mutation in mutations) {
                let element = mutations[mutation];
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
            }
        });
        // github
        if(that.host === 'github.com'){
            mos.observe(document.querySelector('#repo-delete-menu-dialog'), {
                childList: true,
                subtree: true,
            });
        }
        // gitee
        if(that.host === 'gitee.com'){
            mos.observe(document.querySelector('.ui.dimmer.modals.page'), {
                childList: true,
                subtree: true,
            });
        }
        // codeup.aliyun.com
        if(that.host === 'codeup.aliyun.com'){
            mos.observe(document.querySelector('body'), {
                childList: true,
                subtree: true,
            });
        }
        // vercel.com
        if(that.host === 'vercel.com'){
            mos.observe(document.querySelector('body'), {
                childList: true,
                subtree: true,
            });
        }
    }
}

app.init()