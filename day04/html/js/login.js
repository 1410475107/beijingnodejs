window.onload = function () {
    Login();
}

function Login(){
    //更新验证码
    let svg = document.querySelector('#svg');
    svg.onclick = function () {
        this.src = '/coder?' + new Date();
    }
    //验证登录数据
    let login = document.querySelector('.loginsubmit');

    // 回车提交
    window.onkeydown = function (event) {
        if(event.keyCode == '13'){
            login.click();
        }
    }
    
    login.onclick = function () {
        //干掉所有的错误提示信息
        let errlist  =document.querySelectorAll('.H');
        for (const err of errlist) {
            err.remove();
        }
        //账号 密码 验证码  必填
        let username = document.querySelector('#username');
        let passwd = document.querySelector('#passwd');
        let coder = document.querySelector('#coder');

        if(!username.value){
            let tip = document.createElement('div');
            tip.classList.add('H');
            tip.innerHTML = '账号必填';
            username.parentNode.appendChild(tip);
            username.focus();
            return ;
        }
        if(!passwd.value){
            let tip = document.createElement('div');
            tip.classList.add('H');
            tip.innerHTML = '密码必填';
            passwd.parentNode.appendChild(tip);
            passwd.focus();
            return ;
        }
        if(!coder.value){
            let tip = document.createElement('div');
            tip.classList.add('H');
            tip.innerHTML = '验证码必填';
            coder.parentNode.appendChild(tip);
            coder.focus();
            return ;
        }
        //AJAX处理
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/login');
        //请求的数据
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let postdata = `username=${username.value}&passwd=${passwd.value}&coder=${coder.value}`;
        xhr.send(postdata);

        //状态事件监听
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200){
                let r = JSON.parse(xhr.responseText);
                console.log(r);
                if(  r.result ==  'coder_err'){
                    let tip = document.createElement('div');
                    tip.classList.add('H');
                    tip.innerHTML = '验证码错误';
                    coder.parentNode.appendChild(tip);
                    coder.value = '';
                    coder.focus();
                    return ;
                }


                if(  r.result ==  'u_not_exist'){
                    let tip = document.createElement('div');
                    tip.classList.add('H');
                    tip.innerHTML = '账号不存在';
                    username.parentNode.appendChild(tip);
                    username.focus();
                    return ;
                }


                if(  r.result ==  'p_err'){
                    let tip = document.createElement('div');
                    tip.classList.add('H');
                    tip.innerHTML = '密码错误';
                    passwd.parentNode.appendChild(tip);
                    passwd.focus();
                    return ;
                }

                if(  r.result ==  'ok'){
                    window.location.href = '/index';
                }

            }
        }
    }

}