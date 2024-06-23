"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("@faker-js/faker");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var tahunAjaranIds, jurusan, i, jurusanIds, kelas, i, kelasIds, siswa, i, siswaIds, orangTua, i, guru, i, guruIds, mataPelajaran, i, operator, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Seed TahunAjaran
                return [4 /*yield*/, prisma.tahunAjaran.createMany({
                        data: [
                            { tahun: "2021/2022" },
                            { tahun: "2022/2023" },
                            { tahun: "2023/2024" },
                            { tahun: "2024/2025" },
                        ]
                    })];
                case 1:
                    // Seed TahunAjaran
                    _a.sent();
                    return [4 /*yield*/, prisma.tahunAjaran.findMany()];
                case 2:
                    tahunAjaranIds = (_a.sent()).map(function (ta) { return ta.id; });
                    jurusan = [];
                    for (i = 0; i < 5; i++) {
                        jurusan.push({
                            nama: faker_1.faker.commerce.department(),
                            deskripsi: faker_1.faker.lorem.sentence()
                        });
                    }
                    return [4 /*yield*/, prisma.jurusan.createMany({ data: jurusan })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.jurusan.findMany()];
                case 4:
                    jurusanIds = (_a.sent()).map(function (j) { return j.id; });
                    kelas = [];
                    for (i = 0; i < 10; i++) {
                        kelas.push({
                            nama: "Kelas ".concat(faker_1.faker.number.int({ min: 1, max: 12 })),
                            jurusanId: faker_1.faker.helpers.arrayElement(jurusanIds),
                            tahunAjaranId: faker_1.faker.helpers.arrayElement(tahunAjaranIds)
                        });
                    }
                    return [4 /*yield*/, prisma.kelas.createMany({ data: kelas })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, prisma.kelas.findMany()];
                case 6:
                    kelasIds = (_a.sent()).map(function (k) { return k.id; });
                    siswa = [];
                    for (i = 0; i < 50; i++) {
                        siswa.push({
                            nama: faker_1.faker.internet.userName(),
                            nis: faker_1.faker.number.int({ min: 1000, max: 9999 }).toString(),
                            tanggalLahir: faker_1.faker.date.birthdate({ min: 10, max: 18 }),
                            alamat: faker_1.faker.location.streetAddress(),
                            jenisKelamin: faker_1.faker.helpers.arrayElement(["Laki-laki", "Perempuan"]),
                            kelasId: faker_1.faker.helpers.arrayElement(kelasIds)
                        });
                    }
                    return [4 /*yield*/, prisma.siswa.createMany({ data: siswa })];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, prisma.siswa.findMany()];
                case 8:
                    siswaIds = (_a.sent()).map(function (s) { return s.id; });
                    orangTua = [];
                    for (i = 0; i < 50; i++) {
                        orangTua.push({
                            nama: faker_1.faker.internet.userName(),
                            hubungan: faker_1.faker.helpers.arrayElement(["Ayah", "Ibu"]),
                            telepon: faker_1.faker.phone.number(),
                            alamat: faker_1.faker.location.streetAddress(),
                            siswaId: faker_1.faker.helpers.arrayElement(siswaIds)
                        });
                    }
                    return [4 /*yield*/, prisma.orangTua.createMany({ data: orangTua })];
                case 9:
                    _a.sent();
                    guru = [];
                    for (i = 0; i < 10; i++) {
                        guru.push({
                            nama: faker_1.faker.internet.userName(),
                            nip: faker_1.faker.number.int({ min: 10000, max: 99999 }).toString(),
                            alamat: faker_1.faker.location.streetAddress()
                        });
                    }
                    return [4 /*yield*/, prisma.guru.createMany({ data: guru })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, prisma.guru.findMany()];
                case 11:
                    guruIds = (_a.sent()).map(function (g) { return g.id; });
                    mataPelajaran = [];
                    for (i = 0; i < 20; i++) {
                        mataPelajaran.push({
                            nama: faker_1.faker.company.buzzNoun(),
                            kode: faker_1.faker.string.alphanumeric(6).toUpperCase(),
                            guruId: faker_1.faker.helpers.arrayElement(guruIds)
                        });
                    }
                    return [4 /*yield*/, prisma.mataPelajaran.createMany({ data: mataPelajaran })];
                case 12:
                    _a.sent();
                    operator = [];
                    for (i = 0; i < 5; i++) {
                        operator.push({
                            nama: faker_1.faker.internet.userName(),
                            username: faker_1.faker.internet.userName(),
                            password: faker_1.faker.internet.password(),
                            fotoProfile: "profile.jpg",
                            role: "operator"
                        });
                    }
                    return [4 /*yield*/, prisma.operator.createMany({ data: operator })];
                case 13:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
