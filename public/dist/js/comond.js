$(document).ready(function(){
    
    //select
    $('select').each(function(){
        var $this = $(this), numberOfOptions = $(this).children('option').length;
      
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');
    
        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<div />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        var $ulList = $('<ul />', {
            'class': 'select-box'
        }).appendTo($list);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                class: i===1 ? 'asdf' : 'qwer',
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($ulList);
        }
      
        var $listItems = $ulList.children('li'); 
      
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('div.select-options').hide();
            });
            $(this).toggleClass('active').next('div.select-options').toggle();
        });
      
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });
      
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });
    
    });


    //opacity
    setTimeout(()=> {
        $('.fixed-sidebar').addClass('opacity-show')
    }, 1000)

    //visibility password
    var x = document.getElementById("myInput");
    var y = document.getElementById("visibility");

    y && y.addEventListener('click', function() {
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    })

    //active buttons input

    const inputs = $('input.form-field');

    inputs.keyup(function() {
        if(inputs.map(function(index, domElement) {
        if ($(domElement).val() !== "")
            return domElement;
        }).length < inputs.length) {
            $(".button-sign").removeClass('active-btn');                
        } else {
            $(".button-sign").addClass('active-btn');
        }
    });


    //active buttons select

    const selects = $('.selecteds .selected');
    const click_select = $('.select-options li')

    click_select.click(function() {
        if(selects.map(function(index, domElement) {
        if ($(domElement).val() !== "")
            return domElement;
        }).length < selects.length) {
            $(".button-sign").removeClass('active-btn');                
        } else {
            $(".button-sign").addClass('active-btn');
        }
    });

    //placeholders 

    const inputValue = $('.placeholders');

    inputValue.focus(function () {
        $(this).attr('placeholder', '')
    })

    inputValue.blur(function () {
        $(this).attr('placeholder',  $(this).data('placeholder'));
    })


    //multi-form

    const selects_new = $('.selecteds .selected');
    const selects_click = $('.select-options li');
    const inputs_new = $('input.form-field');
    const checkbox = $('.checkbox');

    const validations = createValidtion();

    selects_click.click(checkValidation);
    inputs_new.keyup(checkValidation);
    checkbox.change(checkValidation);

    function createValidtion() {
        
        const arrOfValidation = [];

        selects_new[0] && arrOfValidation.push(selectsValidtion);
        inputs_new[0] && arrOfValidation.push(inputsValidtion);
        checkbox[0] && arrOfValidation.push(checkboxValidtion);

        function selectsValidtion() {
            if( selects.map(function(index, domElement) {
                if ($(domElement).val() !== "")
                    return domElement;
                }).length === selects.length ) {

                return true;
            } 
        }

        function inputsValidtion() {
            if( inputs.map(function(index, domElement) {
                
                if ($(domElement).val() !== "") {
                    return domElement;
                }
                }
            ).length === inputs.length ) {

                return true;
            } 
        }

        function checkboxValidtion() {
            if(checkbox.is(':checked')) {
                return true;
            }
        }

        return arrOfValidation;
    }


    function checkValidation() {
        const isValid = validations.every( funcValidtion => funcValidtion() );
        
        if(isValid) {
            $('.button-sign-multi').addClass('active-btn');
        } else {
            $('.button-sign-multi').removeClass('active-btn');
        }
    } 


    //select valid

    $('.selectDis .asdf').click(function(){
        $(this).parent().parent().prev('.select-styled').addClass('dont-disabled');
        $('.selectDis .select-styled').not('.dont-disabled').addClass('disable-select');
        $('.selectDis .elSelect').attr('required', false);
    });

    $('.selectDis .qwer').click(function(){
        $('.dont-disabled').removeClass('dont-disabled');
        $('.disable-select').removeClass('disable-select');
        $('.selectDis .elSelect').attr('required', true);
    });

    

    

 
});
