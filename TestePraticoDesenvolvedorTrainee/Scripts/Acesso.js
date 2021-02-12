    //==========================PERMISSAO============================

function AdicionarPermission() {
    OpenModal('modal', '/Permissao/Adicionar')
}

function EditarPermission(IdPermission) {
    OpenModal('modal', '/Permissao/Editar/?IdPermission=' + IdPermission)
}

function SalvarPermission() {
    var permission = {}
    var lstPermissionAction = []

    $('#Permission').serializeArray().map(function (x) { permission[x.name] = x.value; })
    $.each($('#lstControllerAction tbody').find('tr'), function (i, item) {
        if ($(item).attr('data-value') == 0) {
            lstPermissionAction.push({
                Id: 0,
                ControllerActionId: $(item).attr('data-ControllerActionId'),
            });
        }
    });

    $.ajax({
        url: $('#Permission').attr('action'),
        type: 'POST',
        data: {
            permission: permission,
            lstPermissionAction: lstPermissionAction
        },
        success: function (data) {
            if (data.Id > 0) {
                $('#modal').modal('toggle');
                RefreshGridView(PermissaoGdv);
                noty({
                    text: 'Permissão salva com sucesso.',
                    layout: 'bottomRight',
                    type: 'success',
                    timeout: 5000
                });
            } else {
                noty({
                    text: 'Houve um erro ao tentar salvar a permissão, certifique-se de que preencheu o formulário corretamente.',
                    layout: 'bottomRight',
                    type: 'error',
                    timeout: 7000
                });
            }
        }
    })
}

function ExcluirPermission(IdPermission) {
    var postUrl = "/Permissao/Excluir/?IdPermission=" + IdPermission;
    ConfirmarExcluir("Permissão", "", "", postUrl, "", PermissaoGdv, null);
}
//==========================PERMISSAOACTION============================

function ExcluirPermissionAction(IdPermissionAction, el) {
    $.ajax({
        url: '/Permissao/ExcluirPermissionAction',
        type: 'POST',
        data: {
            IdPermissionAction: IdPermissionAction
        },
        success: function (data) {
            if (data) {
                $(el).closest('tr').remove
                noty({
                    text: 'Registro excluído com sucesso.',
                    layout: 'bottomRight',
                    type: 'success',
                    timeout: 5000
                });
            } else {
                noty({
                    text: 'Houve um erro ao tentar excluir a ação, certifique-se que tem permição para executar essa ação.',
                    layout: 'bottomRight',
                    type: 'error',
                    timeout: 7000
                });
            }
        }
    });
}

function AddUrl() {
    if (($('#lstControllerAction').find('tbody tr[data-ControllerActionId=' + $('#IdControllerAction').val() + ']').length == 0 && $('#IdControllerAction').val() > 0) ) {
        var url = $('#IdControllerAction').find('option:selected').val() > 0 ? $('#IdControllerAction').find('option:selected').text() : '#';
        
        $('#lstControllerAction tbody').append(
                                        '<tr class="resp" data-value="0" data-ControllerActionId="' + $('#IdControllerAction').val() +'">' +
                                            '<td><strong>' + url + '</strong></td>' +
                                             '<td class="text-center">' +
                                                '<div>' +
                                                    '<span class="btn btn-xs btn-danger resp-deleteitem" onclick="$(this).closest(\'tr\').remove();"><i class="fa fa-times"></i></span>' +
                                                '</div>' +
                                            '</td>' +
                                        '</tr>');


        if ($('.chk-span').hasClass('checked')) {
            $('#InMenu').trigger('change')
            $('[for="InMenu"]').trigger('click')
        }
        $('#MenuName').val('');
        $('#OrderValue').val('');
        $('#Icon').val('');
        $('#IdControllerAction').val('');
        $('#FatherId').val('');
        $('#IdControllerAction').val('');

    }
    else if (!$('#IdControllerAction').val() > 0 ) {
        noty({
            text: 'Houve um erro ao tentar adicionar a Url, certifique-se de que preencheu o formulário corretamente.',
            layout: 'bottomRight',
            type: 'error',
            timeout: 7000
        });
    }

}
//==========================GROUP============================
function SalvarGroup() {
    var group = {};
    $('#Group').serializeArray().map(function (x) { group[x.name] = x.value; });

    $.ajax({
        url: $('#Group').attr('action'),
        type: 'POST',
        data: { group: group },
        success: function (data) {
            $('#addGroup').html(data);
            RefreshGridView(GroupGdv);
        }
    });
}

function EditarGroup(IdGroup) {
    $('#addGroup').load('/Group/Editar/?IdGroup=' + IdGroup);
    $('html, body').animate({ scrollTop: 0 }, 'slow');

}

function ExcluirGroup(IdGroup) {
    var postUrl = '/Group/Excluir/?IdGroup=' + IdGroup;
    ConfirmarExcluir("Groupo de Permissão", "", "", postUrl, "",GroupGdv, null);
}

//==========================PERMISSIONGROUP============================

function AssociarPermissionGroup(IdGroup) {
    OpenModal('modal','/PermissionGroup/AssociarPermissionGroup/?IdGroup=' + IdGroup);
}

function SalvarPermissionGroup() {
    var permissionGroup = {};
    $('#PermissionGroup').serializeArray().map(function (x) { permissionGroup[x.name] = x.value; });

    $.ajax({
        url: $('#PermissionGroup').attr('action'),
        type: 'POST',
        data: { permissionGroup: permissionGroup },
        success: function (data) {
            $('#addPermissionGroup').html(data);
            $('#lstPermissionGroup').load('/PermissionGroup/ListarPermissionGroup');
        }
    });
}

function ExcluirPermissionGroup(IdPermissionGroup) {
    var postUrl = '/PermissionGroup/Excluir/?IdPermissionGroup=' + IdPermissionGroup;
    ConfirmarExcluir("PermissionGroupo de Permissão", "lstPermissionGroup", "/PermissionGroup/ListarPermissionGroup", postUrl, "", null, null);
}

//==========================PERMISSIONGROUPUSER============================

function AssociarPermissionGroupUser(AspNetUserId) {
    OpenModal('modal', '/PermissionGroupUser/AssociarPermissionGroupUser/?AspNetUserId=' + AspNetUserId);
}

function SalvarPermissionGroupUser() {
    var permissionGroupUser = {};
    $('#PermissionGroupUser').serializeArray().map(function (x) { permissionGroupUser[x.name] = x.value; });

    $.ajax({
        url: $('#PermissionGroupUser').attr('action'),
        type: 'POST',
        data: { permissionGroupUser: permissionGroupUser },
        success: function (data) {
            $('#addPermissionGroupUser').html(data);
            $('#lstPermissionGroupUser').load('/PermissionGroupUser/ListarPermissionGroupUser');
        }
    });
}

function ExcluirPermissionGroupUser(IdPermissionGroupUser) {
    var postUrl = '/PermissionGroupUser/Excluir/?IdPermissionGroupUser=' + IdPermissionGroupUser;
    ConfirmarExcluir("PermissionGroupUsero de Permissão", "lstPermissionGroupUser", "/PermissionGroupUser/ListarPermissionGroupUser", postUrl, "", null, null);
}
//==========================GROUP============================
function SalvarPermissionMenu() {

    var permissionMenu = {};
    $('#PermissionMenu').serializeArray().map(function (x) { permissionMenu[x.name] = x.value; });
    permissionMenu.InMenu = IsChecked('#InMenu');
    $.ajax({
        url: $('#PermissionMenu').attr('action'),
        type: 'POST',
        data: { permissionMenu: permissionMenu },
        success: function (data) {
            $('#addPermissionMenu').html(data);
            RefreshGridView(PermissionMenuGdv);
        }
    });
}

function EditarPermissionMenu(IdPermissionMenu) {
    $('#addPermissionMenu').load('/PermissionMenu/Editar/?IdPermissionMenu=' + IdPermissionMenu);
}

function ExcluirPermissionMenu(IdPermissionMenu) {
    var postUrl = '/PermissionMenu/Excluir/?IdPermissionMenu=' + IdPermissionMenu;
    ConfirmarExcluir("PermissionMenu de Permissão", "", "", postUrl, "", PermissionMenuGdv, null);
}