(function () {
    let regsubmit = document.querySelector('.regsubmit');
    regsubmit.onclick = function () {
        //先干掉所有的错误提示信息
        let allerr = document.querySelectorAll('.H');
        for (const err of allerr) {
            err.remove();
        }
        //输入框的内容必填
        let username = document.querySelector('#username');
        let passwd = document.querySelector('#passwd');
        let passwd1 = document.querySelector('#passwd1');
        let errnum = 0;
        if (!username.value) {
            let tip = document.createElement('div');
            tip.innerHTML = '账号必填';
            tip.className = 'H';
            username.parentNode.appendChild(tip);
            errnum++;
        }
        if (!passwd.value) {
            let tip = document.createElement('div');
            tip.innerHTML = '密码必填';
            tip.className = 'H';
            passwd.parentNode.appendChild(tip);
            errnum++;
        }
        if (!passwd1.value) {
            let tip = document.createElement('div');
            tip.innerHTML = '确认密码必填';
            tip.className = 'H';
            passwd1.parentNode.appendChild(tip);
            errnum++;
        } else if (passwd.value != passwd1.value) {
            let tip = document.createElement('div');
            tip.innerHTML = '两次输入的密码不一致';
            tip.className = 'H';
            passwd1.parentNode.appendChild(tip);
            errnum++;
        }
        if(errnum) return ;
        //如果上面的验证都没有问题，就使用AJAX把注册信息提交到服务器
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/regsubmit');
        let postdata = `username=${username.value}&passwd=${passwd.value}`;
        //发起POST请求时必须设置请求头  
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(postdata);

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4 && xhr.status == 200){
                let result = xhr.responseText;
                if(result == 'username_existed'){
                    let tip = document.createElement('div');
                    tip.innerHTML = '账号已经存在，请重新输入';
                    tip.className = 'H';
                    username.parentNode.appendChild(tip);
                }else if(result == 'success'){
                    alert('注册成功');
                    //注册成功，跳转到登录页面
                    window.location.href = '/login';
                }
            }
        }
    }
})();