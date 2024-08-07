const puppeteer = require('puppeteer');
const { Client } = require('pg');

// Configuração da conexão com o PostgreSQL
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'Site',
    password: 'senha123',
    port: 5432,
});

async function fetchTickers() {
    await client.connect();
    const res = await client.query('SELECT ticker FROM dyfinal');
    await client.end();
    return res.rows.map(row => row.ticker);
}

(async () => {
    // Fetch tickers from the database
    const tickers = await fetchTickers();

    // Launch the browser
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu'
        ]
    });

    for (const ticker of tickers) {
        const page = await browser.newPage();

        let found = false;

        // Set up a listener to capture the specific request
        page.on('request', request => {
            const url = request.url();
            if (url.includes('https://investidor10.com.br/api/historico-indicadores')) {
                const tickerUrl = request.headers().referer;
                const ticker = tickerUrl.split('/acoes/')[1].replace('/', '').toUpperCase();

                const apiUrlParts = url.split('/');
                const apiTickerNumber = apiUrlParts[apiUrlParts.length - 2];

                console.log(`${ticker} ${apiTickerNumber}`);
                found = true;
            }
        });

        try {
            // Go to the specified page
            await page.goto(`https://investidor10.com.br/acoes/${ticker}/`, {
                waitUntil: 'domcontentloaded',
                timeout: 30000
            });

            // Wait for the specific request to be made
            try {
                await page.waitForRequest(
                    request =>
                        request.url().includes('https://investidor10.com.br/api/historico-indicadores'),
                    { timeout: 30000 }
                );
            } catch (error) {
                if (!found) {
                    console.log(`${ticker} - Request not found`);
                }
            }
        } catch (error) {
            console.log(`${ticker} - Page not found`);
        }

        await page.close();
    }

    // Close the browser
    await browser.close();
})();


/*
AALR3 243
ABCB4 100
ABEV3 64
ADHM3 432
AESB3 602
AERI3 532
AFLT3 254
AGRO3 320
AGXY3 583
AHEB3 495
AHEB5 496
AHEB6 497
ALLD3 584
ALOS3 656
ALPA3 226
ALPA4 227
ALPK3 353
ALSC3 - Request not found
ALUP11 28
ALUP3 26
ALUP4 27
AMAR3 175
AMBP3 352
AMER3 622
ANIM3 89
ANDG3B 512
ANDG4B - Request not found
APER3 253
APTI3 498
APTI4 499
ARML3 621
ARZZ3 101
ASAI3 626
ATOM3 433
AURA33 608
AURE3 637
AVLL3 529
AZEV3 434
AZEV4 435
AZUL4 91
B3SA3 66
BAHI3 250
BALM3 229
BALM4 228
BAUH4 290
BAZA3 240
BBAS3 42
BBDC3 39
BBDC4 40
BBML3 - Request not found
BBSE3 308
BDLL3 546
BDLL4 87
BEEF11 - Request not found
BEEF3 52
BEES3 238
BEES4 239
BFRE11 535
BFRE12 536
BGIP3 241
BGIP4 242
BHIA3 655
BIDI11 62
BIDI3 60
BIDI4 61
BIOM3 221
BLUT3 477
BLUT4 478
BLAU3 585
BMEB3 233
BMEB4 234
BMGB4 103
BMIN3 347
BMIN4 348
BMKS3 115
BMOB3 572
BNBR3 232
BOAS3 555
BOBR3 364
BOBR4 365
BPAC11 104
BPAC3 105
BPAC5 106
BPAN4 82
BPAR3 235
BPAT33 511
BPHA3 534
BRAP3 116
BRAP4 117
BRBI11 614
BRBI3 - Request not found
BRBI4 - Request not found
BRFS3 65
BRGE11 337
BRGE12 653
BRGE3 339
BRGE5 340
BRGE6 342
BRGE7 341
BRGE8 338
BRIN3 - Request not found
BRIT3 619
BRIV3 245
BRIV4 246
BRKM3 118
BRKM5 120
BRKM6 119
BRML3 112
BRPR3 258
BRQB3 439
BRSR3 107
BRSR5 108
BRSR6 109
BSEV3 255
BSLI3 436
BSLI4 437
BTLL4 - Request not found
CALI3 453
CALI4 454
CAMB3 440
CAMB4 441
CAML3 90
CASH3 563
CASN3 442
CASN4 443
CATA3 446
CATA4 - Request not found
CBAV3 611
CBEE3 88
CCRO3 257
CCXC3 444
CEAB3 121
CEBR3 423
CEBR5 424
CEBR6 425
CEDO3 421
CEDO4 422
CEEB3 316
CEEB5 317
CEEB6 318
CEED3 325
CEED4 326
CEGR3 415
CEPE3 416
CEPE5 417
CEPE6 418
CESP3 125
CESP5 126
CESP6 127
CGAS3 55
CGAS5 56
CGRA3 159
CGRA4 160
CIEL3 41
CLSA3 620
CLSC3 122
CLSC4 123
CMIG3 46
CMIG4 47
CMIN3 576
CMSA3 448
CMSA4 449
CNSY3 450
COCE3 304
COCE5 305
COCE6 306
COGN3 132
CORR3 455
CORR4 456
CPFE3 268
CPLE11 635
CPLE3 263
CPLE5 265
CPLE6 264
CPRE3 269
CREM3 539
CRFB3 251
CRIV3 430
CRIV4 431
CRPG3 272
CRPG5 271
CRPG6 270
CSAB3 426
CSAB4 427
CSAN3 48
CSED3 573
CSMG3 262
CSNA3 131
CSRN3 247
CSRN5 248
CSRN6 249
CSUD3 273
CTCA3 - Request not found
CTKA3 368
CTKA4 369
CTNM3 267
CTNM4 266
CTSA3 396
CTSA4 397
CTSA8 398
CURY3 552
CVCB3 77
CXSE3 590
CYRE3 128
DASA3 130
DESK3 609
DEXP3 464
DEXP4 465
DIRR3 276
DMMO11 645
DMMO3 279
DMVF3 458
DOHL3 278
DOHL4 277
DOTZ3 623
DTCY3 459
DTCY4 460
DXCO3 134
EALT3 136
EALT4 137
ECOR3 75
ECPR3 283
ECPR4 282
EEEL3 327
EEEL4 560
EGIE3 143
EKTR3 419
EKTR4 420
ELEK3 519
ELEK4 520
ELET3 138
ELET5 139
ELET6 140
ELMD3 574
ELPL3 332
EMAE3 281
EMAE4 280
EMBR3 135
ENAT3 141
ENBR3 67
ENEV3 142
ENGI11 97
ENGI3 99
ENGI4 98
ENJU3 527
ENMA3B 537
ENMA6B 538
ENMT3 285
ENMT4 284
EPAR3 438
EQPA3 286
EQPA5 287
EQPA6 288
EQPA7 289
EQTL3 150
ESPA3 567
ESTR3 153
ESTR4 154
ETER3 155
EUCA3 334
EUCA4 335
EVEN3 144
EZTC3 151
FBMC3 540
FBMC4 541
FESA3 156
FESA4 157
FHER3 292
FIBR3 - Request not found
FIEI3 - Request not found
FIGE3 475
FIGE4 476
FIQE3 610
FLEX3 561
FLRY3 3
FNCN3 463
FRAS3 293
FRIO3 376
FRTA3 387
FTRT3B 542
G2DI33 601
GBIO33 523
GEPA3 191
GEPA4 190
GFSA3 152
GGBR3 53
GGBR4 54
GGPS3 588
GMAT3 525
GNDI3 - Request not found
GOAU3 31
GOAU4 32
GOLL4 76
GPAR3 445
GPIV33 - Request not found
GRAO3 618
GRND3 161
GSHP3 158
GUAR3 83
GUAR4 636
HAGA3 366
HAGA4 367
HAPV3 162
HBOR3 344
HBRE3 582
HBSA3 553
HBTS5 294
HETA3 467
HETA4 468
HGTX3 124
HOOT3 469
HOOT4 470
HYPE3 302
IDVL3 236
IDVL4 237
IFCM3 596
IGBR3 471
IGSN3 472
IGTA3 163
IGTI11 639
IGTI3 361
IGTI4 638
INEP3 473
INEP4 474
INNT3 - Request not found
INTB3 566
IRBR3 96
ITEC3 543
ITSA3 43
ITSA4 44
ITUB3 45
ITUB4 38
JALL3 361
JBSS3 63
JCPC3 397
JFEN3 198
JHSF3 69
JPSA3 526
JSLG3 95
KEPL3 292
KLBN11 51
KLBN3 49
KLBN4 50
LAVV3 542
LCAM3 145
LEVE3 146
LIGT3 70
LIPR3 516
LOGG3 575
LPSB3 85
LREN3 73
LUPA3 625
LUXM3 478
LUXM4 479
LVBI3 559
MAGA3 428
MANA3 186
MANA4 185
MATD3 469
MATD4 470
MDIA3 80
MDNE3 549
MEAL3 78
MELI34 379
MERC3 274
MERC4 275
MGEL3 480
MGEL4 481
MGLU3 79
MMXM11 599
MMXM3 600
MNDL3 87
MNPR3 362
MOAR3 617
MODL11 623
MODL3 621
MODL4 622
MOSI3 524
MOVI3 110
MRFG3 50
MRSA3B 476
MRSA5B 477
MRSA6B 478
MRVE3 36
MSAN3 183
MSAN4 182
MSPA3 522
MSPA4 523
MTIG3 181
MTIG4 180
MTRE3 598
MTSA3 185
MTSA4 186
MYPK3 174
NAFG3 437
NAFG4 438
NEOE3 35
NEMO3 325
NEMO5 326
NEMO6 327
NORD3 519
NTCO3 92
NUTR3 360
ODER3 471
ODER4 472
ODPV3 172
OFSA3 468
OIBR3 82
OIBR4 83
OMGE3 299
ORVR3 620
PATI3 495
PATI4 496
PCAR3 169
PDGR3 170
PEAB3 423
PEAB4 424
PETR3 25
PETR4 24
PFRM3 488
PINE3 175
PINE4 176
PLAS3 481
PLAS4 482
PMAM3 83
PNVL3 488
PNVL4 489
POMO3 177
POMO4 178
POSI3 120
PRIO3 13
PRNR3 579
PSSA3 20
PTBL3 183
PTNT3 392
PTNT4 393
QUAL3 92
RADL3 84
RAIL3 21
RANI3 528
RANI4 529
RDNI3 178
REDE3 492
RENT3 14
RNEW11 111
RNEW3 108
RNEW4 109
ROMI3 91
RPAD3 380
RPAD5 381
RPMG3 405
RSID3 184
SANB11 74
SANB3 72
SANB4 73
SAPR11 29
SAPR3 27
SAPR4 28
SBSP3 86
SCAR3 362
SCAR4 363
SEDU3 620
SEER3 105
SGPS3 180
SHOW3 547
SLCE3 149
SMFT3 583
SMLE3 583
SNSY3 293
SNSY5 294
SNSY6 295
SOMA3 122
SOND3 422
SOND5 423
SOND6 424
SPRI3 619
SPRI4 620
STBP3 181
SULA11 144
SULA3 142
SULA4 143
SUZB3 22
SYNE3 180
TAEE11 67
TAEE3 65
TAEE4 66
TASA3 448
TASA4 449
TCNO3 430
TCNO4 431
TCSA3 168
TECN3 396
TEKA3 358
TEKA4 359
TELB3 28
TELB4 29
TEND3 130
TGMA3 131
TIET11 134
TIET3 132
TIET4 133
TIMP3 84
TKNO3 133
TKNO4 134
TMAR5 73
TMAR8 74
TOTS3 21
TPIS3 577
TRAD3 626
TRIS3 136
TRPL3 138
TRPL4 137
TRXF11 609
TUPY3 97
TXRX3 379
TXRX4 380
UCAS3 449
UCAS4 450
UGPA3 69
UNIP3 19
UNIP5 20
UNIP6 18
USIM3 44
USIM5 45
USIM6 43
VALE3 19
VAMO3 567
VBBR3 183
VCSA3 134
VIIA3 77
VITT3 613
VIVA3 599
VIVR3 86
VIVT3 33
VLID3 100
VLID11 101
VULC3 135
VVAR3 90
WEGE3 1
WEST3 121
WHRL3 125
WHRL4 126
WIZS3 101
WLMM3 320
WLMM4 321
WSON33 38
XPBR31 524
YDUQ3 32
YEPAR3 533
YEPAR5 534
ZAMP3 578

*/

