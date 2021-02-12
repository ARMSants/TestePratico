//#region - Masks

function LoadMasks() {

    $('.date').mask('00/00/0000');
    $('.date').attr('placeholder', '00/00/0000');
    $('.cpf').mask('000.000.000-00');
    $('.cpf').attr('placeholder', '000.000.000-00');
    $('.rg').mask('00.000.000');
    $('.rg').attr('placeholder', '00.000.000');
    $('.cnpj').mask('00.000.000/0000-00');
    $('.cnpj').attr('placeholder', '00.000.000/0000-00');
    $('.money').mask('000000000000000,00', { reverse: true });
    $('.money2').mask('000000000000000,00', { reverse: true });
    $('.money3').attr('placeholder', '0,00');
    $(".money3").maskMoney({ thousands: '.', decimal: ',' });
    $('.percent').attr('placeholder', '0,00%');
    $('.percent').mask('000,00', { reverse: true });
    $('.cep').mask('00000000');
    $('.phone').mask('(00) 0000-0000');
    $('.phone').attr('placeholder', '(00) 0000-0000');
    $('.phone_with_ddd').mask('(00) 00000-0000');
    $('.dataTable').dataTable({ "order": false, destroy: true });
}
$.fn.hasAttr = function (name) {
    return this.attr(name) !== undefined;
};

var datesCompare = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp) 
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return (
            d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                    d.constructor === Number ? new Date(d) :
                        d.constructor === String ? new Date(d) :
                            typeof d === "object" ? new Date(d.year, d.month, d.date) :
                                NaN
        );
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(a = this.convert(a).valueOf()) &&
                isFinite(b = this.convert(b).valueOf()) ?
                (a > b) - (a < b) :
                NaN
        );
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return (
            isFinite(d = this.convert(d).valueOf()) &&
                isFinite(start = this.convert(start).valueOf()) &&
                isFinite(end = this.convert(end).valueOf()) ?
                start <= d && d <= end :
                NaN
        );
    }
}

function SomenteNumeros(num) {
    debugger
    var numsStr = num.replace(/[^0-9]/g, '');
    return parseInt(numsStr);
}

function ConvertDate(date, tipo) {
    if (tipo == 2) {

        var x = new Date(date).toLocaleDateString().split('/')
        return x[2] + '-' + x[1] + '-' + x[0];
    }
    else {

    }
    return new Date(SomenteNumeros(date)).toLocaleDateString();
}

function BetweenDatas(dateFrom, DateTo, DateCheck) {

    if (dateFrom.includes("-"))
        var d1 = dateFrom.split("-");
    if (DateTo.includes("-"))
        var d2 = DateTo.split("-");
    if (DateCheck.includes("-"))
        var c = DateCheck.split("-");

    var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);  // -1 because months are from 0 to 11
    var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    if (check >= from && check <= to) {
        return true;
    } else {
        return false;
    }
}

$(document).on('change', '.number', function () {
    if (parseFloat($(this).val()) < 0) {
        $(this).val(0);
    }

    if (!IsNull($(this).attr('max'))) {
        var max = parseFloat($(this).attr('max'));
        if (parseFloat($(this).val()) > max) {
            $(this).val(max)
        }
    }

    if (!IsNull($(this).attr('min'))) {
        var min = parseFloat($(this).attr('min'));
        if (parseFloat($(this).val()) < min) {
            $(this).val(min)
        }
    }

});

$(document).on('focusout', '.money', function () {
    if (IsNull($(this).val())) {
        $(this).val('0,00');
    }
});

var MaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(MaskBehavior.apply({}, arguments), options);
        }
    };

$('.cellphone').mask(MaskBehavior, spOptions);
$('.cellphone').attr('placeholder', '(00) 00000-0000');

$('.cellphone').on('change', function () {
    if ($(this).val().length < 14) {
        $(this).val('')
    }
})

$('.now-datepicker').datepicker({
    format: 'dd/mm/yyyy',
    startDate: new Date(),
    setDate: new Date(),
    autoclose: true,
    language: 'pt',

});
$('.now-datepicker2').datepicker({
    format: 'dd/mm/yyyy',
    setDate: new Date(),
    autoclose: true,

    language: 'pt',

});

$('.now-datepicker3').datepicker({
    format: 'dd/mm/yyyy',
    setDate: new Date(),
    autoclose: true,
    startDate: new Date(),
    language: 'pt',
});

$('.now-timepicker24').timepicker({
    defaultDate: new Date(),
    showSeconds: false,
    showMeridian: false,
    minuteStep: 1,

});
$('.now-timepicker-interval').timepicker({
    timeFormat: 'HH:mm',
    defaultDate: '12:00',
    startTime: '10:00',
    showMeridian: false,
    interval: 30,
    minuteStep: 30,
});
$('.date-month5').datepicker({
    format: 'm/yyyy',
    viewMode: "months",
    minViewMode: "months",
    autoclose: true,
    language: 'pt',
});

$('.date-year').datepicker({
    format: 'yyyy',
    viewMode: "years",
    minViewMode: "years",
    autoclose: true,
    language: 'pt',
    endDate: new Date(),
});

//#endregion

//#region - Funções Auxiliares


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}


function compareDates(date1, date2, tipo) {

    var int_date1 = parseInt(date1.split('/')[2].toString() + date1.split('/')[1].toString() + date1.split('/')[0].toString());
    var int_date2 = parseInt(date2.split('/')[2].toString() + date2.split('/')[1].toString() + date2.split('/')[0].toString());
    if (tipo == 2) {
        if (int_date1 >= int_date2) {
            return true
        }
        else {
            return false;
        }
    } else {

        if (int_date1 > int_date2) {
            return true
        }
        else {
            return false;
        }
    }
}
var n;
var timeoutID;

function IsChecked(e) {

    if ($(e).parent().hasClass('checkbox-material')) {
        return $('[for="' + $(e).attr('id') + '"]').find('.chk-span').hasClass('checked');
    }
    return $(e).is(':checked');
}


function Mensagem(type, element, obj, msg, grid) {
    if (msg != null && msg != "") {
        noty({
            text: msg,
            layout: 'bottomRight',
            type: type,
            timeout: 5000
        });
        if (grid !== null && grid != '' && typeof (grid) != "undefined") { }

            //RefreshGridView(grid);

    } else {
        if (type === 'error') {
            noty({
                text: 'Erro ao adicionar ' + obj + ', cerfique-se que preencheu o fomulário corretamente',
                layout: 'bottomRight',
                type: 'error',
                timeout: 5000
            });
        } else {
            if ($('#' + element).attr('action').includes("Editar")) {
                noty({
                    text: obj + ' ' + 'foi editado(a) com sucesso!',
                    layout: 'bottomRight',
                    type: 'success',
                    timeout: 5000
                });
            } else {
                noty({
                    text: obj + ' ' + 'foi adicionado(a) com sucesso!',
                    layout: 'bottomRight',
                    type: 'success',
                    timeout: 5000
                });
            }
           

        }
    }
}

$(document).ajaxStart(function () {

    $('.loading').show();

    if ($(document).find('#NotLoading').length == 0) {
        $(document).find('button').each(function () {
            if (!$(this).is(':disabled')) {
                $(this).addClass('IsDisabled');
                $(this).attr('disabled', true);
            }
        });
    }
    RemoveToolTips()

});

$(document).ajaxStop(function () {

    $('.loading').hide();

    ActiveCSS('ajax');

    $(document).find('button').each(function () {
        if ($(this).hasClass('IsDisabled')) {
            $(this).removeClass('IsDisabled');
            $(this).attr('disabled', false);
        }
    });
});

$(document).on('focusout', 'input,textarea', function () {

    if (!$(this).hasClass('not-upper'))
        this.value = this.value.toUpperCase();
});

$(document).on('keyup', '.cpf_cnpj', function () {
    var val = $(this).val().replace(/[^0-9]/g, "");
    var tamanho = val.length;
    if (tamanho < 11) {
        $(this).mask("000.000.000-00");
    } else {
        $(this).mask("00.000.000/0000-00");
    }
});

$(document).on('change', '.cpf', function () {
    debugger
    if (!validaCPF(this.value)) {
        noty({
            text: 'CPF inválido',
            layout: 'bottomRight',
            type: 'error',
            timeout: 5000
        });
    }
});

function DropDownOptionRemove(IdDropDown) {
    $(IdDropDown + ' option[value="' + $(IdDropDown).val() + '"]').remove();
    $(IdDropDown).val('');
    $(IdDropDown).next('span').find('input').val('');
}

function DropDownSetData(IdDropDown, Value, CallBack) {
    $(IdDropDown).val(Value);
    $(IdDropDown).next('span').find('input').val($(IdDropDown + ' option[value="' + Value + '"]').text());
    //$(IdDropDown).trigger('change');
    if (CallBack != null) {
        CallBack();
    }
}


function DropDownOptionsReload(urlload, DropDownIds, ValueSelected, NmSelected) {
    $.get(urlload, function (data) {

        if (data != "") {

            var html = $($.parseHTML(data));

            $.each(DropDownIds, function (i, item) {

                $(item).empty();
                $(item).next('span').find('input').val('');
                $(item).val('');

                $.each($(html).find(item + ' option'), function (i, _item) {
                    $(item).append(_item.outerHTML);
                });

                if (ValueSelected > 0 && NmSelected != "") {

                    $(item).val(ValueSelected);
                    $($(item).next().children())[0].value = NmSelected;
                    $(item).trigger('change');

                }

            });

        } else {
            noty({
                text: 'Ops, não foi possível carregar o dropdown!.',
                layout: 'bottomRight',
                type: 'error',
                timeout: 7000
            });
        }
    });
}


function validaEmail(email) {

    var valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //var valid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return valid.test(email);
}


$(document).on('focusout keyup', '.val-minmax', function () {
    var val = parseInt($(this).val()) ? parseInt($(this).val()) : -1;

    if (val < $(this).attr('min'))
        $(this).val($(this).attr('min'));
    else if (val > $(this).attr('max'))
        $(this).val($(this).attr('max'));

});

$(document).on('click', '.custom-combobox', function () {

    var length = $(this).prev().find('option').length;

    if (length == 0 || length == 1) {
        if (length == 0) {
            noty({
                text: 'Esta lista não possui itens!',
                layout: 'bottomRight',
                type: 'warning',
                timeout: 7000
            });

            if (!IsNull($(this).prev().attr('MsgEmpty'))) {
                noty({
                    text: $(this).prev().attr('MsgEmpty'),
                    layout: 'bottomRight',
                    type: 'error',
                    timeout: 7000
                });
            }

        } else {
            if (IsNull($(this).prev().find('option').attr('value'))) {
                noty({
                    text: 'Esta lista não possui itens!',
                    layout: 'bottomRight',
                    type: 'warning',
                    timeout: 7000
                });

                if (!IsNull($(this).prev().attr('MsgEmpty'))) {
                    noty({
                        text: $(this).prev().attr('MsgEmpty'),
                        layout: 'bottomRight',
                        type: 'error',
                        timeout: 7000
                    });
                }
            }
        }
    }
});

$(document).ready(function () {
    ActiveCSS('load');
});

function ActiveCSS(request) {
    //ativa campos autocomplete
    if ($('.auto-complete').length > 0) {
        AutoComplete();
    }

    LoadMasks();

    //Active Summernote 

    //Set style upper case for all inputs
    //$('input,textarea').not('.not-upper').css('text-transform', 'uppercase');
    $('.set-mask').each(function () {
        if ($(this).attr('data-tpmask') != "" && $(this).attr('data-tpmask') !== undefined) {
            SetMaskElement(this, $(this).attr('data-tpmask'));
        } else {
            $(this).removeAttr('data-tpmask')
            $(this).attr('maxlength', 500);
        }

    });
    //adiciona um btn para acionar o filtro da devexpress
    $('input[data-val-required],textarea[data-val-required],select[data-val-required]').prev('label').addClass('label-required');

    if (request == 'ajax') {
        //Ativa material checkboxes on modals
        wskCheckbox.init();

        //Ativa material checkboxes on modals
        $('.dataTable').dataTable({ "order": false, destroy: true });

        $('.FixedCollumnTable').dataTable({
            //scrollY: "300px",
            scrollX: true,
            scrollCollapse: true,
            paging: false,
            fixedColumns: {
                leftColumns: 1,
                rightColumns: 1
            }
        });

        //Active datetimepicker on ajax
        if ($('.date,.now-datepicker,.date-now').length > 0) {
            $('.date').datepicker({
                format: 'dd/mm/yyyy',
                setDate: new Date(),
                autoclose: true,
                language: 'pt',
            });
            $('.now-datepicker, .date-now').datepicker({
                format: 'dd/mm/yyyy',
                startDate: new Date(),
                setDate: new Date(),
                autoclose: true,
                language: 'pt',
            });
            $('.now-datepicker2,.date-today').datepicker({
                format: 'dd/mm/yyyy',
                setDate: new Date(),
                autoclose: true,
                language: 'pt',
            });
            $('.date-month').datepicker({
                format: 'mm/yyyy',
                viewMode: "months",
                minViewMode: "months",
                autoclose: true,
                language: 'pt',
            })
        }
        if ($('.time,.now-timepicker24,.timer').length > 0) {
            $('.now-timepicker24,.time').timepicker({
                defaultDate: new Date(),
                showSeconds: false,
                showMeridian: false,
                minuteStep: 1
            });
            $('.timer').timepicker({
                defaultTime: "00:00:01",
                showSeconds: true,
                showMeridian: false,
                minuteStep: 1,
                secondStep: 1
            });
        }
        if ($('.date-month').length > 0) {
            $('.date-month').datepicker({
                format: 'mm/yyyy',
                setDate: new Date(),
                autoclose: true,
                language: 'pt',
            });
        }

    }
}

function GoBack() {
    history.go(-1);
}


function AutoComplete() {
    if ($(".auto-complete").length > 0) {
        $.widget("custom.combobox", {
            _create: function () {
                this.wrapper = $("<span>")
                    .addClass("custom-combobox")
                    .insertAfter(this.element);

                this.element.hide();
                this._createAutocomplete();
                this._createShowAllButton();
            },
            _createAutocomplete: function () {
                var selected = this.element.children(":selected"),
                    value = selected.val() ? selected.text() : "";

                if (this.element.hasClass("readonly")) {

                    this.input = $("<input>")
                        .appendTo(this.wrapper)
                        .val(value)
                        .attr("title", "")
                        .attr("readonly", "readonly")
                        .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left input-autocomplete")
                        .autocomplete({
                            delay: 0,
                            minLength: 0,
                            source: $.proxy(this, "_source")
                        })
                        .tooltip({
                            classes: {
                                "ui-tooltip": "ui-state-highlight"
                            }
                        });
                } else {
                    this.input = $("<input>")
                        .appendTo(this.wrapper)
                        .val(value)
                        .attr("title", "")
                        .addClass("custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left input-autocomplete")
                        .autocomplete({
                            delay: 0,
                            minLength: 0,
                            source: $.proxy(this, "_source")
                        })
                        .tooltip({
                            classes: {
                                "ui-tooltip": "ui-state-highlight"
                            }
                        });
                }
                this._on(this.input, {
                    autocompleteselect: function (event, ui) {
                        ui.item.option.selected = true;
                        this._trigger("select", event, {
                            item: ui.item.option
                        });
                        //select on original select
                        //this.val(ui.item.option.value);
                        this.element.val(ui.item.option.value).change();
                    },
                    autocompletechange: "_removeIfInvalid"
                });
            },
            _createShowAllButton: function () {
                var input = this.input,
                    wasOpen = false;

                if (!(this.element.hasClass("readonly"))) {

                    $("<a>")
                        .attr("tabIndex", -1)
                        .attr("title", "Ver todos")
                        .tooltip()
                        .appendTo(this.wrapper)
                        .button({
                            icons: {
                                primary: "ui-icon-triangle-1-s"
                            },
                            text: false
                        })
                        .removeClass("ui-corner-all")
                        .addClass("custom-combobox-toggle ui-corner-right")
                        .on("mousedown", function () {
                            wasOpen = input.autocomplete("widget").is(":visible");
                        })
                        .on("click", function () {
                            input.trigger("focus");

                            // Close if already visible
                            if (wasOpen) {
                                return;
                            }

                            // Pass empty string as value to search for, displaying all results
                            input.autocomplete("search", "");
                        });
                }
            },
            _source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var a = this.element.children("option").map(function () {
                    var text = $(this).text();
                    if (this.value && (!request.term || matcher.test(text)))
                        return {
                            label: text,
                            value: text,
                            option: this
                        };

                });
                if (!a.length) {//Adicioanr btn para gerar novo registro
                    if (this.element.is('[data-function]') || this.element.is('[data-functionurl]')) {
                        var option = '<option class="add-select-item">Adicionar: ' + request.term + '</option>'

                        if (this.element.find('.add-select-item')) {
                            this.element.find('.add-select-item').remove();
                        }
                        this.element.append(option);
                        a = this.element.children("option").map(function () {
                            var text = $(this).text();
                            if (this.value && (!request.term || matcher.test(text)))
                                return {
                                    label: text,
                                    value: request.term,
                                    option: this
                                };
                        });
                    }
                } else {
                    $('.add-select-item').remove();
                }
                response(a);
            },
            _removeIfInvalid: function (event, ui) {
                // Selected an item, nothing to do
                if (ui.item) {
                    return;
                }
                // Search for a match (case-insensitive)
                var value = this.input.val(),
                    valueLowerCase = value.toLowerCase(),
                    valid = false;
                this.element.children("option").each(function () {
                    if ($(this).text().toLowerCase() === valueLowerCase) {
                        this.selected = valid = true;
                        return false;
                    }
                });
                // Found a match, nothing to do
                if (valid) {
                    return;
                }
                // Remove invalid value
                this.input
                    .val("")
                    .attr("title", value + " Nenhum valor selecionado");
                // .tooltip("open");
                this.element.val("");
                this._delay(function () {
                    //this.input.tooltip("close").attr("title", "");
                }, 100);
                this.input.autocomplete("instance").term = "";
            },
            _destroy: function () {
                this.wrapper.remove();
                this.element.show();
            }
        });
        $(".auto-complete").combobox();
    }
}

function validaCPF(CPF) {
    CPF = CPF.replace(/[^\d]+/g, '');
    var Soma;
    var Resto;
    Soma = 0;
    if (CPF.length != 11) return false;
    if (CPF == "" ||
        CPF == "00000000000" ||
        CPF == "11111111111" ||
        CPF == "22222222222" ||
        CPF == "44444444444" ||
        CPF == "55555555555" ||
        CPF == "66666666666" ||
        CPF == "77777777777" ||
        CPF == "88888888888" ||
        CPF == "99999999999") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(CPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(CPF.substring(10, 11))) return false;
    return true;
}


function ConfirmarExcluir(obj, idLst, urlReload, postUrl, msg, GridView, SuccessCallBack, FailCallback) {
    debugger
    if (msg == "") {
        msg = '<div class="col-md-12"><strong><font size = "5">' + obj + '</font></strong></div>' +
            '<div class="col-md-12"><font size = "3"> <p>Tem certeza que deseja excluir este registro?</p></font></div>';
    } else {
        msg = '<div class="col-md-12"><strong><font size = "5">' + obj + '</font></strong></div>' +
            '<div class="col-md-12"><font size = "3"> <p>' + msg + '</p></font></div>';
    }
    $.confirm({
        theme: 'supervan',
        icon: 'fa fa-trash',
        closeIcon: true,
        animation: 'scale',
        type: 'orange',
        title: '<strong>Excluir</strong>',
        content: msg,
        autoClose: 'Cancelar|8000',
        buttons: {
            Sim: {
                text: 'Sim',
                action: function () {
                    $.ajax({
                        url: postUrl,
                        type: 'POST',
                        success: function (data) {
                            debugger
                            if (data == true) {
                                if (idLst != "") {
                                    $('#' + idLst).load(urlReload);
                                }


                                if (SuccessCallBack != null) {
                                    debugger
                                    SuccessCallBack(data);
                                }

                                noty({
                                    text: 'Registro excluído com Sucesso',
                                    layout: 'bottomRight',
                                    type: 'success',
                                    timeout: 5000
                                });

                            } else {

                                if (FailCallback != null) {

                                    FailCallback(data);

                                } else {

                                    noty({
                                        text: (data != false && typeof (data) == "string") ? data : 'Houve um erro ao tentar excluir este registro, certifique-se de você tem permissão para essa ação ou entre em contato com o adminstrador.',
                                        layout: 'bottomRight',
                                        type: 'error',
                                        timeout: 7000
                                    });
                                }
                            }
                        }
                    });
                }
            },
            Cancelar: function () {
            }
        }
    });
}

function OpenModal(idModal, url, callback) {

    $.get(url, function (data) {
        if (data != "") {
            $('#' + idModal).html(data);
            $('#' + idModal).modal();

            if (callback != null) {
                callback();
            }

            ActiveCSS('load');
        } else {
            noty({
                text: 'Ops, não foi possível abrir o popup certifique-se de que tem permissão para essa ação.',
                layout: 'bottomRight',
                type: 'error',
                timeout: 7000
            });
        }
    });
}

function CleanForm(form) {
    $(form).find('input,textarea').each(function (i) {
        if ($(this).parent().prev('select').attr('Id') != 'IdEmpresa') {
            $(this).val('');
        }
        if ($(this).attr('type') == 'checkbox') {
            $(this).prop('checked', false);
        }
    });
}

function RemoveToolTips() {
    $(document).find('.tooltip').remove();
}

function ShowPropover(e) {
    if ($(e).find('.propover-item').length > 0) {
        $(e).find('.propover-item').show();//.css('display','block');
    }
}

function RemovePropover(e) {
    if ($(e).find('.propover-item').length > 0) {
        $(e).find('.propover-item').hide();//.css('display','block');
    }
}

function IsNull(string) {
    if (string === null || string === undefined || string === "" || string === '') {
        return true;
    }
    return false;
}

function ConfirmMensagem(title, content, cor, icon, callback, closeIcon) {
    if (IsNull(closeIcon)) {
        closeIcon = true;
    }

    $.confirm({
        theme: 'modern',
        icon: 'fa ' + icon,
        closeIcon: closeIcon,
        animation: 'zoom',
        type: cor,
        title: '<strong>' + title + '</strong>',
        content: content,
        buttons:
        {
            Ok: function () {
                if (callback != null) {
                    callback();
                }
            }
        }
    });
}



$(document).on('keyup', '.cep', function (event) {

    if ($(this).val().length == 8) {
        var cep = $(this).val().replace(/[^0-9]/g, "");
        var url = "https://viacep.com.br/ws/" + cep + "/json?callback=?"; //adicionar json?callback=? para forcar crossdomain

        $.getJSON(url, function (d) {

            if (d.erro) {

                $("#Logradouro").val("");
                $("#Cidade").val("");
                $("#UF").val("");
                //$("#NmBairro").val("");
            } else {
                $("#Logradouro").val(d.logradouro);
                //$("#NmBairro").val(d.bairro);
                $("#Cidade").val(d.localidade);
                $("#UF").val(d.uf);
                //$("#UF").next('span').find('input').val(d.uf);
            }
        });
    }
    else {
        $("#Logradouro").val("");
        $("#Cidade").val("");
        $("#UF").val("");
    }
});
