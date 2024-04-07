// ==UserScript==
// @name         自动输入二次确认文本
// @namespace    npm/vite-plugin-monkey
// @version      1.0.3
// @author       monkey
// @description  自动输入需要二次确认的文本
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAcJJREFUeF7tWttxwjAQXDohnZBOoBJCJaSTpBPoBHIZG2SPjM6nEyNbqx8zg3QjrXfvYd0GjY9N4+cHASADGkeAEmicAHSClEDFEtgBOAKQ55zxC+D0t06eyVEzAy4AtskTxCfI4T81a9cKwBXAx9IB2HcSmMuC1Uhg6gXeRn9ksThrsYZiBeYQADJgiEAWi7MWF6C3xmQxCUjCcc6IvZrNa+dIGOu9ufwORwoAiRqSQEkUiQ2xd+gTpZABP4asS3sg67yvLqubA4C8xKnD93YeeUIIwBhZ66Y915UCQPb4f/aaAfjuqDoGVCMBYUGqhkgCUKuDTAEwK4F6xQAC4ClmR1tkgDETjAJHCQRoWqnlyG6VKes+yYCYdCgBSuCJgFVbKuE6TrLukz6APmCIAGuBVDXIWsDRcXmaohNkLRBxZgqKMQwyDDIMDhBgHsA8oOLP4iVvhnodJCWgiCzFp7z1YqSlq7FHD1GY71u7skrRQG6GpNvrbZejpQ7ibddaC0T3UWvF9wo0AmAshsiAGAKUgLeHcrRnjUqraZRkr3BGwxZ7hdfQLu/oTqZNLTEKuAJDAFzhXKAxMmCBL811y80z4A7Z+otB27V0OwAAAABJRU5ErkJggg==
// @match        https://github.com/*
// @match        https://gitee.com/*
// @match        https://codeup.aliyun.com/*
// @match        https://vercel.com/*
// @match        https://dash.cloudflare.com/*
// ==/UserScript==

(function () {
  'use strict';

  const app = {
    host: location.host,
    init() {
      console.log("init", this.host);
      this.onMutationObserver();
    },
    dispatchInputEmit: function(element, isReact) {
      let event = new Event("input", { bubbles: true });
      if (isReact) {
        event.simulated = true;
        let tracker = element._valueTracker;
        if (tracker) {
          tracker.setValue(element);
        }
      }
      element.dispatchEvent(event);
    },
    onMutationObserver() {
      let that = this;
      let mos = new MutationObserver(function(mutations, observer) {
        for (let mutation in mutations) {
          let element = mutations[mutation];
          if (that.host === "github.com") {
            if (element.target.id === "repo-delete-warning-container") {
              let $verificationField = document.querySelector("#verification_field");
              if ($verificationField) {
                $verificationField.value = $verificationField.getAttribute("data-repo-nwo");
                document.querySelector("#repo-delete-proceed-button").disabled = false;
                that.dispatchInputEmit($verificationField, true);
              }
            }
          }
          if (that.host === "gitee.com") {
            if (element.target && element.target.classList.contains("fade")) {
              let $pathWithNamespace = document.querySelector("#path_with_namespace");
              if ($pathWithNamespace) {
                $pathWithNamespace.value = document.querySelector(".highlight-black").innerText;
                that.dispatchInputEmit($pathWithNamespace);
              }
            }
          }
          if (that.host === "codeup.aliyun.com") {
            if (element.target.classList.contains("next-overlay-inner")) {
              let $nextOverlayWrapper = document.querySelector(".next-overlay-wrapper");
              let $deletePathResourceName = $nextOverlayWrapper.querySelector(".delete-path-resource-name");
              let $name = $nextOverlayWrapper.querySelector("#name");
              let $reason = $nextOverlayWrapper.querySelector("#reason");
              if ($name) {
                let $targetName = $deletePathResourceName.querySelector("label");
                $name.value = $targetName.innerText.split(" ")[1];
                that.dispatchInputEmit($name, true);
                $reason.value = "确认删除";
                that.dispatchInputEmit($reason, true);
              }
            }
          }
          if (that.host === "vercel.com") {
            if (element.target.nodeName.toLowerCase() == "reach-portal") {
              let $modalInsetWrapper = document.querySelector("div[data-geist-modal-inset]");
              let $labelPB = $modalInsetWrapper.querySelectorAll("label p b");
              let $resourceName = $modalInsetWrapper.querySelector("input[name=resourceName]");
              let $verificationText = $modalInsetWrapper.querySelector("input[name=verificationText]");
              if ($resourceName) {
                $resourceName.value = $labelPB[0].innerText;
                that.dispatchInputEmit($resourceName, true);
                $verificationText.value = $labelPB[1].innerText;
                that.dispatchInputEmit($verificationText, true);
              }
            }
          }
          if (that.host === "dash.cloudflare.com") {
            if (element.target.nodeName.toLowerCase() == "div" && element.target.querySelector("#focusFallback")) {
              let $focusFallback = element.target.querySelector("#focusFallback");
              let $productionName = $focusFallback.querySelector("form>div>strong>span");
              let $deletionChallenge = $focusFallback.querySelector("input[id=deletionChallenge]");
              if ($productionName) {
                $deletionChallenge.value = $productionName.innerText;
                that.dispatchInputEmit($deletionChallenge, true);
              }
            }
          }
        }
      });
      if (that.host === "github.com") {
        mos.observe(document.querySelector("#repo-delete-menu-dialog"), {
          childList: true,
          subtree: true
        });
      }
      if (that.host === "gitee.com") {
        mos.observe(document.querySelector(".ui.dimmer.modals.page"), {
          childList: true,
          subtree: true
        });
      }
      if (that.host === "codeup.aliyun.com") {
        mos.observe(document.querySelector("body"), {
          childList: true,
          subtree: true
        });
      }
      if (that.host === "vercel.com") {
        mos.observe(document.querySelector("body"), {
          childList: true,
          subtree: true
        });
      }
      if (that.host === "dash.cloudflare.com") {
        mos.observe(document.querySelector("body"), {
          childList: true,
          subtree: true
        });
      }
    }
  };
  app.init();

})();