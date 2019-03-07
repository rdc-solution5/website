(function (window) {
    // 使用构造函数方法 声明一个Modal对象
    var Modal = function (ele) {
        this.$el = ele;
        this.init();

    }
    // 在Modal的原型上实现close，open，init方法，实现方法的复用
    Modal.prototype.close = function () {
        this.$el.style.display = 'none';

    }
    Modal.prototype.open = function () {
        this.$el.style.display = 'block';

    }
    Modal.prototype.init = function () {
        var self = this;
        // 绑定关闭按钮点击事件处理函数，检索所有 带 .close类名 的按钮
        if (this.$el.addEventListener) {
            this.$el.addEventListener('click', function (e) {
                e.preventDefault();
                var target = e.target;
                var classNames = target.className.split(' ');
                if (classNames.indexOf('close') !== -1) {
                    self.close();

                }

            }, false);

        } else if (this.$el.attachEvent) {
            this.$el.attachEvent('onclick', function (e) {
                e = e || window.event;
                if (e.preventDefault) {
                    e.preventDefault();

                } else {
                    e.returnValue = false;

                }
                var target = e.target || e.srcElement;
                var classNames = target.className.split(' ');
                if (classNames.indexOf('close') !== -1) {
                    self.close();

                }

            });

        }

    }
    window.Modal = Modal;
    var modal = new Modal(document.getElementById('modal'));
    var modalSuccess = new Modal(document.getElementById('modal-success'));
    var isGetCode = false;
    var address = 'https://www.enterplorer.com';

    $('.apply').on('click', function () {
        $('#apply-trail-form')[0].reset()
        $('.alert-info').text('').css('color', 'red')
        modal.open()
    })
    //点击刷新验证码
    function refreshCodeImg() {
        var nowDate = Date.parse(new Date());
        $('.verify-code-img img').attr('src', address + '/api/getVerifyCode?' + nowDate)
    }
    $('.verify-code-img').on('click', refreshCodeImg)
    $('input').on('focus', function () {
        $('.alert-info').text('')
    })
    //获取验证码、验证图片验证码是否正确
    $('.get-code').on('click', function () {
        var mobile = $('input[name="mobile"]').val();
        var verifycode = $('#applyCode').val();
        var regPhone = /^1[34578]\d{9}$/;
        var _this = this;
        var second = 30;
        var timer;
        if (isGetCode) {
            return;
        }
        if (!regPhone.test(mobile)) {
            $('.alert-info').text('手机号码格式有误')
            return;
        }
        $(_this).text(second + 's')
        timer = setInterval(function () {
            if (second === 1) {
                $(_this).text('获取验证码')
                isGetCode = false;
                clearInterval(timer)
            } else {
                second--
                isGetCode = true;
                $(_this).text(second + 's')
            }
        }, 1000)
        var data = {
            mobile: mobile,
            verifycode: verifycode,
            sms_type: 'Enterplorer'
        }
        $.ajax({
            url: address + '/api/postVerifyCode',
            type: 'POST',
            data: data,
            success: function (data) {
                if (data.errCode) {
                    $('.alert-info').text(data.errMessage)
                    refreshCodeImg();
                }
            }
        })
    })
    //申请试用、表单提交
    $('.submit-info').on('click', function () {
        var dataArray = $('#apply-trail-form').serializeArray();
        var obj = {};
        var isEmpty = false;
        for (var i = 0; i < dataArray.length; i++) {
            if ($.trim(dataArray[i]['value']) == '') {
                $('.alert-info').text('请填写完整的表单信息');
                isEmpty = true;
                break;
            }
            obj[dataArray[i]['name']] = dataArray[i]['value']
        }
        if (isEmpty) {
            return;
        }
        //ajax
        $.ajax({
            url: address + '/api/enterplorerRegister',
            type: 'POST',
            data: obj,
            success: function (data) {
                if (data.errCode) {
                    $('.alert-info').text(data.errMessage)
                    return;
                }
                modal.close()
                modalSuccess.open()
                setTimeout(function () {
                    modalSuccess.close()
                }, 2000)
            }
        })
    })
})(window)