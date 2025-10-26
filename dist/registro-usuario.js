"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = init;
var tslib_1 = require("tslib");
function init() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            console.log('registro-usuario js cargado');
            return [2 /*return*/];
        });
    });
}
init();
var API_URL_USUARIO = 'http://127.0.0.1:8000';
function registrarUsuario(event) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var nombre, contrasena, correo, telefono, usuario, response, usuarioCreado, e_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event.preventDefault();
                    console.log('Registrando usuario...');
                    nombre = document.getElementById('nombre').value;
                    contrasena = document.getElementById('contrasena').value;
                    correo = document.getElementById('correo').value;
                    telefono = document.getElementById('telefono').value;
                    usuario = {
                        nombre: nombre,
                        contrasena: contrasena,
                        correo: correo,
                        telefono: telefono
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("".concat(API_URL_USUARIO, "/usuarios"), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(usuario),
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error("Error ".concat(response.status, " en la solicitud"));
                    return [4 /*yield*/, response.json()];
                case 3:
                    usuarioCreado = _a.sent();
                    console.log('Usuario registrado:', usuarioCreado);
                    window.location.href = 'cotiza.html';
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    alert('Error al registrar usuario: ' + e_1.message);
                    document;
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
(_a = document
    .getElementById("registrar-usario")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", registrarUsuario);
