"use strict";
/* =====================================================================
   BORSA KAPLANI — Stock Market Simulator (Live Feed)
   Bilingual (TR default) · v6.2
   FIXED: detectLang default TR, landing.* i18n anahtarları eklendi,
          hideLanding() eklendi, startNewGame/loadGame içine hideLanding çağrısı
   ===================================================================== */

/* ============================================================
   i18n
   ============================================================ */
const I18N = {
  en: {
    'brand.line1':'BORSA','brand.line2':'KAPLANI','brand.tag':'STOCK MARKET SIMULATOR',
    'onboard.lead':'The hunt begins, Investor.',
    'onboard.li1':'Starting capital: <b>$1,000</b>',
    'onboard.li2':'Live market: <b>Every 0.5 seconds</b>',
    'onboard.li3':'55 stocks: <b>25 Türkiye</b> + <b>30 Global</b>',
    'onboard.li4':'Read the news, hire staff, build your strategy.',
    'onboard.warnTitle':'⚠️ IMPORTANT NOTICE — PLEASE READ',
    'onboard.warnText':'This game is a <b>completely fictional stock market simulation</b>. The companies, prices, news, indicators and all data within it are <b>not real</b>; they have no connection to any real company, market or event.<br><br>This simulation <b>does not provide investment advice</b>. Any gains or losses here carry no meaning in the real world. Always consult a professional before making investment decisions in the real market.<br><br><b>The game contains elements of chance</b>. Analyst opinions and analyses are <b>suggestions only</b> and offer no guarantee of results.',
    'onboard.consent':'I have <b>read, understood and accepted</b> the notice above. I understand this game is a fictional simulation.',
    'onboard.start':'Start the Hunt',
    'onboard.load':'Load Saved Game',
    'onboard.footnote':'All companies, prices and news are entirely fictional.',
    'hdr.cash':'Cash','hdr.worth':'Total Net Worth','hdr.pl':'Profit / Loss','hdr.time':'Elapsed',
    'hdr.live':'Live','hdr.save':'Save','hdr.newGame':'New Game',
    'nav.dashboard':'Dashboard','nav.market':'Market','nav.portfolio':'Portfolio','nav.watchlist':'Watchlist',
    'nav.news':'News','nav.expert':'Analyst View','nav.team':'My Team','nav.stats':'Statistics','nav.about':'About',
    'footer.about':'About','footer.privacy':'Privacy Policy','footer.terms':'Terms of Service',
    'footer.cookies':'Cookie Policy','footer.disclaimer':'Disclaimer','footer.contact':'Contact',
    'footer.copy':'All rights reserved. Fictional simulation.',
    'common.confirmNew':'Start a new game? Current progress will be deleted.',
    'common.toastSaved':'Game saved','common.toastSaveErr':'Save failed',
    'common.toastLoaded':'Saved game loaded','common.toastLoadErr':'Load failed',
    'common.toastNoSave':'No saved game found — starting new game',
    'common.toastNewGame':'New game started',
    'common.insufficient':'Insufficient cash',
    'common.invalidQty':'Enter a valid quantity',
    'common.notTraded':'This stock is not trading',
    'common.notFound':'Company not found',
    'common.notOwned':'You do not own this stock',
    'common.onlyOwn':'You only hold {n} shares',
    'common.bought':'{n} {t} bought @ {p}',
    'common.sold':'{n} {t} sold @ {p}',
    'common.dividendRecv':'Dividend received: {v} · {t}',
    'common.dividendPaid':'{name} paid a quarterly dividend',
    'common.bankrupt':'{name} went bankrupt.',
    'common.watchAdd':'Added to watchlist','common.watchRemove':'Removed from watchlist',
    'common.watchRemove2':'Removed',
    'common.achUnlocked':'🏆 Achievement: {n}',
    'common.staffHired':'{icon} {name} hired → Level {lvl}',
    'common.staffUpgraded':'{icon} {name} upgraded → Level {lvl}',
    'dash.totalWorth':'Total Net Worth','dash.cash':'Cash','dash.equity':'Stock Value','dash.marketState':'Market State',
    'dash.cashPct':'{p}% of your wealth is cash','dash.inStocks':'in {n} stocks',
    'dash.perf':'Portfolio Performance','dash.elapsed':'Elapsed {t}',
    'dash.gainers':'TOP GAINERS','dash.losers':'TOP LOSERS',
    'dash.econ':'Economic Indicators','dash.cycle':'Cycle',
    'dash.recentNews':'Latest News','dash.watch':'Watchlist',
    'dash.watchEmpty':'Your watchlist is empty.','dash.watchHint':'You can add stocks from the Market screen.',
    'dash.summary':'Summary','dash.totalTrades':'Total trades','dash.closedPL':'Realized P/L',
    'dash.dividends':'Dividends received','dash.teamLv':'My Team','dash.ach':'Achievements',
    'market.search':'Search company, ticker, sector, country...',
    'market.allCountries':'🌍 All Countries','market.turkey':'🇹🇷 Türkiye','market.global':'🌐 Global',
    'market.stocks':'stocks','market.company':'Company','market.price':'Price','market.change':'Change',
    'market.mcap':'Market Cap','market.pe':'P/E','market.div':'Dividend','market.sector':'Sector','market.country':'Country',
    'port.equity':'Stock Value','port.unrealized':'Unrealized P/L','port.alloc':'Allocation',
    'port.myStocks':'My Positions','port.shares':'Shares','port.avg':'Avg Cost','port.last':'Current Price',
    'port.value':'Value','port.pl':'P/L','port.ret':'Return',
    'port.empty':'You have not bought any stock yet.','port.emptyHint':'Buy your first stock from the Market screen.',
    'port.advisorTitle':'💼 Portfolio Advisor','port.advisorSub':'Level {lvl}',
    'port.weak':'Your weakest position: <b class="down">{t}</b> ({p})',
    'port.health':'Portfolio health score: <b style="color:{c}">{s}/100</b>',
    'port.warnDiversify':'<b style="color:var(--warn)">Warning:</b> Your portfolio is not diversified enough ({n} stocks).',
    'port.warnConcentrated':'<b style="color:var(--warn)">Concentration:</b> {p}% of your portfolio is in one stock.',
    'port.goodDiv':'✓ Diversification level looks good.',
    'port.disclaimer':'For informational purposes only. Not investment advice.',
    'watch.title':'Watchlist','watch.stocks':'stocks','watch.remove':'Remove',
    'watch.empty':'Your watchlist is empty.','watch.emptyHint':'Open a company and press "Track".',
    'news.title':'News','news.count':'news','news.all':'All','news.major':'⭐ Major','news.company':'🏢 Company',
    'news.earnDiv':'📊 Earnings & Dividend','news.macro':'🏛️ Economy','news.sector':'🏭 Sector','news.crisis':'⚠️ Crisis',
    'news.none':'No news.','news.empty':'No news available.',
    'newsDetail.related':'Related Company','newsDetail.inspect':'Inspect Company →',
    'newsDetail.note':'News is generated randomly within the simulation and does not reflect real events. Price impact is <b>probabilistic</b> — no guaranteed outcome.',
    'newsDetail.positive':'Positive','newsDetail.negative':'Negative','newsDetail.neutral':'Neutral',
    'newsDetail.major':'⭐ Major',
    'newsAlert.major':'⭐ MAJOR NEWS','newsAlert.new':'📰 New News',
    'expert.title':'Analyst View','expert.sub':'Live market scan',
    'expert.intro':'This screen <b style="color:var(--text)">impartially summarizes</b> market data. Gainers, losers and companies with notable fundamentals are listed. <b style="color:var(--warn)">These are not investment advice</b> — the final decision is always yours. The market is full of chance; past performance does not guarantee future returns.',
    'expert.gaining':'📈 Currently Gaining','expert.gainingSub':'Top movers right now',
    'expert.losing':'📉 Currently Declining','expert.losingSub':'Biggest drops right now',
    'expert.notable':'💡 Worth Watching','expert.notableSub':'Companies with notable fundamentals',
    'expert.summary':'Market Summary','expert.regime':'MARKET REGIME','expert.upDown':'UP / DOWN',
    'expert.avgChange':'AVG CHANGE','expert.sentiment':'MARKET SENTIMENT',
    'expert.heat':'🔬 Sector Heatmap','expert.heatSub':'Data Scientist · Level {lvl}',
    'expert.heatDesc':'Average change per sector. The darker the color, the larger the move.',
    'expert.noCo':'No companies.',
    'team.title':'My Team','team.levels':'{a}/{b} levels',
    'team.intro':'Staff provide <b style="color:var(--text)">information and small improvements</b>. They do not guarantee gains, do not change market logic and are not pay-to-win.',
    'team.note':'<b style="color:var(--warn)">Note:</b> Staff provide info or minor convenience; they do not manipulate price movements.',
    'team.levelN':'Level {n}/{m}','team.hire':'Hire','team.upgrade':'Upgrade','team.maxed':'✓ Maximum level reached',
    'stats.title':'Statistics','stats.totalWorth':'Total Net Worth','stats.totalPL':'Total P/L',
    'stats.realized':'Realized P/L','stats.dividends':'Dividend Income','stats.totalTrades':'Total Trades',
    'stats.peakWorth':'Peak Net Worth','stats.maxDD':'Max Drawdown','stats.played':'Time Played',
    'stats.bestWorst':'Best / Worst Trade','stats.best':'Best closed trade','stats.worst':'Worst closed trade',
    'stats.seed':'Seed','stats.saveLoad':'Save / Load',
    'stats.autosave':'Auto-saved every 12 seconds.','stats.saveBtn':'Save','stats.loadBtn':'Load','stats.newBtn':'New Game',
    'stats.ach':'Achievements',
    'about.title':'🐯 Borsa Kaplanı — Welcome',
    'about.intro':'<b style="color:var(--text)">Borsa Kaplanı</b> is a fully fictional stock market simulator. None of the companies, prices, news or data here are real. The goal is to deliver a simple investor experience through stock analysis, news tracking, trading and team management.',
    'about.startCap':'STARTING CAPITAL','about.tickRate':'TICK RATE','about.commission':'BASE COMMISSION',
    'about.stocks':'STOCKS','about.tickVal':'0.5 seconds','about.stockBreak':'({t} TR · {g} Global)',
    'about.guide':'Guide — What and How to Use',
    'about.devTeam':'Developer Team','about.devIntro':'This simulation was developed by the following team.',
    'about.roleFounder':'FOUNDER DEVELOPER','about.roleDev':'DEVELOPER',
    'co.marketCap':'Market Cap','co.pe':'P/E','co.divYield':'Dividend Yield','co.range52':'52-Week Range',
    'co.trade':'Trade','co.qty':'Quantity','co.max':'Max','co.buy':'Buy','co.sell':'Sell',
    'co.cash':'Cash','co.maxBuy':'Max buyable','co.owned':'You hold','co.avgCost':'Avg. cost','co.commission':'Commission',
    'co.expert':'Analyst View','co.expertSub':'Suggestion — not a guarantee',
    'co.companyNews':'Company News','co.noNews':'No news yet.','co.insufficient':'Insufficient cash',
    'co.watch':'☆ Track','co.watching':'★ Tracking','co.back':'← Back',
    'co.disclaimer':'<b style="color:var(--warn)">This is not investment advice.</b> The market is full of chance; past performance does not guarantee the future.',
    'co.analyst':'📋 Analysis Assistant','co.analystSub':'Level {lvl}',
    'co.upcomingEarn':'Upcoming earnings','co.upcomingDiv':'Upcoming dividend','co.now':'Now',
    'co.inNDays':'in {n} cycles','co.sectorComp':'SECTOR COMPARISON','co.avg':'avg.',
    'co.dataSci':'🔬 Data Scientist','co.volLevel':'Volatility level','co.riskScore':'Risk score','co.beta':'Beta coefficient',
    'co.volLow':'Low','co.volMid':'Medium','co.volHigh':'High',
    'co.range1w':'1W','co.range1m':'1M','co.range3m':'3M','co.range1y':'1Y','co.rangeAll':'All',
    'co.iflas':'BANKRUPT',
    'sent.extremeFear':'Extreme Fear','sent.fear':'Fear','sent.neutral':'Neutral','sent.greed':'Greed','sent.extremeGreed':'Extreme Greed',
    'regime.bull':'Bull Market','regime.bear':'Bear Market','regime.side':'Sideways Market',
    'cycle.expansion':'Expansion','cycle.peak':'Peak','cycle.recession':'Recession','cycle.recovery':'Recovery',
    'econRow.inflation':'Inflation','econRow.rate':'Interest Rate','econRow.gdp':'Economic Growth',
    'econRow.unemployment':'Unemployment','econRow.consumer':'Consumer Confidence',
    'empty.noData':'No data',
    'empty.notEnough':'Not enough data',
    'policy.backToGame':'← Back to Game','policy.updated':'Last updated: January 2026',
    'policy.privacyTitle':'Privacy Policy','policy.termsTitle':'Terms of Service',
    'policy.cookiesTitle':'Cookie Policy','policy.disclaimerTitle':'Disclaimer','policy.contactTitle':'Contact',
    'nav.guide':'📚 Guide','nav.aboutLink':'About',
    'landing.title':'🐯 Welcome to Borsa Kaplanı',
    'landing.desc':'Borsa Kaplanı is a <b style="color:var(--text)">fully fictional stock market simulator</b>. Companies, prices and news here are not real. <b style="color:var(--warn)">Not investment advice.</b>',
    'landing.start':'🎯 Start Game',
    'landing.load':'📂 Load Saved Game',
    'landing.aboutTitle':'What is Borsa Kaplanı?',
    'landing.aboutText':'<p class="tiny muted" style="line-height:1.85"><b style="color:var(--text)">Borsa Kaplanı</b> is a free <b style="color:var(--text)">stock market simulation game</b>. Trade across 55 fictional companies.</p><p class="tiny muted" style="line-height:1.85;margin-top:8px"><b style="color:var(--text)">How to play?</b> Start with $1,000 virtual cash.</p><p class="tiny muted" style="line-height:1.85;margin-top:8px"><b style="color:var(--warn)">Important:</b> Not investment advice.</p>',
    'footer.guide':'Guide',
    'lang.name':'English'
  },
  tr: {
    'brand.line1':'BORSA','brand.line2':'KAPLANI','brand.tag':'BORSA SİMÜLATÖRÜ',
    'onboard.lead':'Av başlıyor, Yatırımcı.',
    'onboard.li1':'Başlangıç Sermayen: <b>1.000 $</b>',
    'onboard.li2':'Canlı borsa: <b>Her 0,5 saniyede</b> fiyat hareketi',
    'onboard.li3':'55 hisse: <b>25 Türkiye</b> + <b>30 Global</b>',
    'onboard.li4':'Haberleri oku, çalışanlarını kur, stratejini belirle.',
    'onboard.warnTitle':'⚠️ ÖNEMLİ UYARI — LÜTFEN OKUYUN',
    'onboard.warnText':'Bu oyun <b>tamamen kurgusal bir borsa simülasyonudur</b>. İçeriğindeki şirketler, fiyatlar, haberler, göstergeler ve tüm veriler <b>gerçek değildir</b>; hiçbir gerçek şirket, piyasa veya olay ile bağlantısı yoktur.<br><br>Bu simülasyon <b>yatırım tavsiyesi vermez</b>. Buradaki kazanç veya kayıplar gerçek dünyada hiçbir anlam taşımaz. Gerçek borsada yatırım kararı vermeden önce mutlaka bir uzmana danışın.<br><br><b>Oyun şans faktörü içerir</b>. Uzman görüşleri ve analizler yalnızca <b>öneri</b>dir, kesin sonuç garantisi vermez.',
    'onboard.consent':'Yukarıdaki uyarıyı <b>okudum, anladım ve kabul ediyorum</b>. Bu oyunun kurgusal bir simülasyon olduğunu biliyorum.',
    'onboard.start':'Avlanmaya Başla',
    'onboard.load':'Kayıtlı Oyunu Yükle',
    'onboard.footnote':'Tüm şirketler, fiyatlar ve haberler tamamen kurgusaldır.',
    'hdr.cash':'Nakit Para','hdr.worth':'Toplam Varlık','hdr.pl':'Kâr / Zarar','hdr.time':'Süre',
    'hdr.live':'Canlı','hdr.save':'Kaydet','hdr.newGame':'Yeni Oyun',
    'nav.dashboard':'Panel','nav.market':'Piyasa','nav.portfolio':'Varlıklarım','nav.watchlist':'Takiptekiler',
    'nav.news':'Haberler','nav.expert':'Uzman Görüşü','nav.team':'Ekibim','nav.stats':'İstatistikler','nav.about':'Hakkında',
    'footer.about':'Hakkında','footer.privacy':'Gizlilik Politikası','footer.terms':'Kullanım Şartları',
    'footer.cookies':'Çerez Politikası','footer.disclaimer':'Yasal Uyarı','footer.contact':'İletişim',
    'footer.copy':'Tüm hakları saklıdır. Kurgusal simülasyon.',
    'common.confirmNew':'Yeni oyun başlatılsın mı? Mevcut ilerleme silinecek.',
    'common.toastSaved':'Oyun kaydedildi','common.toastSaveErr':'Kayıt başarısız',
    'common.toastLoaded':'Kayıtlı oyun yüklendi','common.toastLoadErr':'Yükleme başarısız',
    'common.toastNoSave':'Kayıtlı oyun bulunamadı — yeni oyun başlatılıyor',
    'common.toastNewGame':'Yeni oyun başladı',
    'common.insufficient':'Yetersiz nakit','common.invalidQty':'Geçerli bir adet girin',
    'common.notTraded':'Şirket işlem görmüyor','common.notFound':'Şirket bulunamadı',
    'common.notOwned':'Bu hisseye sahip değilsin','common.onlyOwn':'Elinde yalnızca {n} hisse var',
    'common.bought':'{n} {t} alındı @ {p}','common.sold':'{n} {t} satıldı @ {p}',
    'common.dividendRecv':'Kâr payı alındı: {v} · {t}','common.dividendPaid':'{name} çeyreklik kâr payı ödedi',
    'common.bankrupt':'{name} iflas etti.','common.watchAdd':'Takiptekilere eklendi',
    'common.watchRemove':'Takipten çıkarıldı','common.watchRemove2':'Çıkarıldı',
    'common.achUnlocked':'🏆 Başarım: {n}','common.staffHired':'{icon} {name} işe alındı → Seviye {lvl}',
    'common.staffUpgraded':'{icon} {name} yükseltildi → Seviye {lvl}',
    'dash.totalWorth':'Toplam Varlık','dash.cash':'Nakit Para','dash.equity':'Hisse Değeri','dash.marketState':'Piyasa Durumu',
    'dash.cashPct':'Varlığının %{p}\'i nakit','dash.inStocks':'{n} hissede',
    'dash.perf':'Varlık Performansı','dash.elapsed':'Süre {t}','dash.gainers':'YÜKSELENLER','dash.losers':'DÜŞENLER',
    'dash.econ':'Ekonomik Göstergeler','dash.cycle':'Döngü','dash.recentNews':'Son Haberler','dash.watch':'Takiptekiler',
    'dash.watchEmpty':'Takip listen boş.','dash.watchHint':'Piyasa ekranından hisse ekleyebilirsin.',
    'dash.summary':'Özet','dash.totalTrades':'Toplam İşlem','dash.closedPL':'Kapanan Kâr/Zarar',
    'dash.dividends':'Alınan Kâr Payı','dash.teamLv':'Ekibim','dash.ach':'Başarımlar',
    'market.search':'Şirket, sembol, sektör, ülke ara...','market.allCountries':'🌍 Tüm Ülkeler',
    'market.turkey':'🇹🇷 Türkiye','market.global':'🌐 Global','market.stocks':'hisse',
    'market.company':'Şirket','market.price':'Fiyat','market.change':'Değişim','market.mcap':'Şirket Değeri',
    'market.pe':'Fiyat / Kazanç','market.div':'Kâr Payı','market.sector':'Sektör','market.country':'Ülke',
    'port.equity':'Hisse Değeri','port.unrealized':'Açık Kâr / Zarar','port.alloc':'Dağılım',
    'port.myStocks':'Hisselerim','port.shares':'Adet','port.avg':'Ort. Maliyet','port.last':'Güncel Fiyat',
    'port.value':'Değer','port.pl':'Kâr/Zarar','port.ret':'Getiri',
    'port.empty':'Henüz hisse almadın.','port.emptyHint':'Piyasa ekranından ilk hisseni al.',
    'port.advisorTitle':'💼 Portföy Danışmanı','port.advisorSub':'Seviye {lvl}',
    'port.weak':'En zayıf pozisyonun: <b class="down">{t}</b> ({p})',
    'port.health':'Portföy sağlık skoru: <b style="color:{c}">{s}/100</b>',
    'port.warnDiversify':'<b style="color:var(--warn)">Uyarı:</b> Portföyün yeterince çeşitlendirilmemiş ({n} hisse).',
    'port.warnConcentrated':'<b style="color:var(--warn)">Yoğunlaşma:</b> Portföyün %{p}\'i tek hissede.',
    'port.goodDiv':'✓ Çeşitlendirme seviyesi iyi görünüyor.',
    'port.disclaimer':'Bilgilendirme amaçlıdır, yatırım tavsiyesi değildir.',
    'watch.title':'Takiptekiler','watch.stocks':'hisse','watch.remove':'Çıkar',
    'watch.empty':'Takip listen boş.','watch.emptyHint':'Bir şirketi aç ve "Takip Et" düğmesine bas.',
    'news.title':'Haberler','news.count':'haber','news.all':'Tümü','news.major':'⭐ Önemli',
    'news.company':'🏢 Şirket','news.earnDiv':'📊 Bilanço & Kâr Payı','news.macro':'🏛️ Ekonomi',
    'news.sector':'🏭 Sektör','news.crisis':'⚠️ Kriz','news.none':'Haber yok.','news.empty':'Haber yok.',
    'newsDetail.related':'İlgili Şirket','newsDetail.inspect':'Şirketi İncele →',
    'newsDetail.note':'Haberler simülasyon içinde rastgele üretilir ve gerçek olayları yansıtmaz. Fiyat etkisi <b>olasılıksaldır</b> — kesin sonuç vermez.',
    'newsDetail.positive':'Olumlu','newsDetail.negative':'Olumsuz','newsDetail.neutral':'Nötr','newsDetail.major':'⭐ Önemli',
    'newsAlert.major':'⭐ ÖNEMLİ HABER','newsAlert.new':'📰 Yeni Haber',
    'expert.title':'Uzman Görüşü','expert.sub':'Canlı piyasa taraması',
    'expert.intro':'Bu ekran piyasadaki verileri <b style="color:var(--text)">tarafsız şekilde özetler</b>. Yükselen, düşen ve temel göstergeleri öne çıkan şirketler listelenir. <b style="color:var(--warn)">Bunlar yatırım tavsiyesi değildir</b> — nihai karar her zaman size aittir. Borsa şans işidir, geçmiş performans gelecek getiriyi garanti etmez.',
    'expert.gaining':'📈 Şu An Yükselenler','expert.gainingSub':'Anlık en çok değer kazananlar',
    'expert.losing':'📉 Şu An Düşenler','expert.losingSub':'Anlık en çok değer kaybedenler',
    'expert.notable':'💡 Dikkat Çekenler','expert.notableSub':'Temel göstergeleri öne çıkanlar',
    'expert.summary':'Piyasa Özeti','expert.regime':'PİYASA DURUMU','expert.upDown':'YÜKSELEN / DÜŞEN',
    'expert.avgChange':'ORTALAMA DEĞİŞİM','expert.sentiment':'PİYASA DUYGUSU',
    'expert.heat':'🔬 Sektör Isı Haritası','expert.heatSub':'Veri Bilimci · Seviye {lvl}',
    'expert.heatDesc':'Sektörlerin ortalama değişimi. Renk koyulaştıkça hareket büyür.','expert.noCo':'Şirket yok.',
    'team.title':'Ekibim','team.levels':'{a}/{b} seviye',
    'team.intro':'Çalışanlar size <b style="color:var(--text)">bilgi ve küçük iyileştirmeler</b> sunar. Kesin kazanç sağlamaz, borsa mantığını değiştirmez, pay-to-win değildir.',
    'team.note':'<b style="color:var(--warn)">Not:</b> Çalışanlar bilgi sağlar veya ufak kolaylık sunar; fiyat hareketlerini manipüle etmez.',
    'team.levelN':'Seviye {n}/{m}','team.hire':'İşe Al','team.upgrade':'Yükselt','team.maxed':'✓ Maksimum seviyeye ulaşıldı',
    'stats.title':'İstatistikler','stats.totalWorth':'Toplam Varlık','stats.totalPL':'Toplam Kâr/Zarar',
    'stats.realized':'Kapanan Kâr/Zarar','stats.dividends':'Kâr Payı Geliri','stats.totalTrades':'Toplam İşlem',
    'stats.peakWorth':'En Yüksek Varlık','stats.maxDD':'En Yüksek Düşüş','stats.played':'Oynanan Süre',
    'stats.bestWorst':'En İyi / En Kötü İşlem','stats.best':'En iyi kapanan işlem','stats.worst':'En kötü kapanan işlem',
    'stats.seed':'Tohum','stats.saveLoad':'Kaydet / Yükle','stats.autosave':'Her 12 saniyede otomatik kaydedilir.',
    'stats.saveBtn':'Kaydet','stats.loadBtn':'Yükle','stats.newBtn':'Yeni Oyun','stats.ach':'Başarımlar',
    'about.title':'🐯 Borsa Kaplanı — Hoş Geldin',
    'about.intro':'<b style="color:var(--text)">Borsa Kaplanı</b>, tamamen kurgusal bir borsa simülasyonudur. Buradaki hiçbir şirket, fiyat, haber veya veri gerçek değildir. Amaç; hisse analizi, haber takibi, alım-satım ve ekip yönetimi üzerinden basit bir yatırımcı deneyimi yaşatmaktır.',
    'about.startCap':'BAŞLANGIÇ SERMAYESİ','about.tickRate':'TICK HIZI','about.commission':'TEMEL KOMİSYON',
    'about.stocks':'HİSSE SAYISI','about.tickVal':'0,5 saniye','about.stockBreak':'({t} TR · {g} Global)',
    'about.guide':'Bilgilendirme — Neyi Nasıl Kullanırsın?','about.devTeam':'Geliştirici Ekibi',
    'about.devIntro':'Bu simülasyon aşağıdaki ekip tarafından geliştirilmiştir.',
    'about.roleFounder':'KURUCU GELİŞTİRİCİ','about.roleDev':'GELİŞTİRİCİ',
    'co.marketCap':'Şirket Değeri','co.pe':'Fiyat / Kazanç','co.divYield':'Kâr Payı Verimi','co.range52':'52 Haftalık Aralık',
    'co.trade':'İşlem Yap','co.qty':'Adet','co.max':'Maks','co.buy':'Al','co.sell':'Sat',
    'co.cash':'Nakit','co.maxBuy':'Alınabilecek maks.','co.owned':'Elinde','co.avgCost':'Ort. maliyet','co.commission':'Komisyon',
    'co.expert':'Uzman Görüşü','co.expertSub':'Öneri — kesin sonuç değil',
    'co.companyNews':'Şirket Haberleri','co.noNews':'Henüz haber yok.','co.insufficient':'Yetersiz nakit',
    'co.watch':'☆ Takip Et','co.watching':'★ Takipte','co.back':'← Geri Dön',
    'co.disclaimer':'<b style="color:var(--warn)">Bu bir yatırım tavsiyesi değildir.</b> Borsa şans işidir; geçmiş performans geleceği garanti etmez.',
    'co.analyst':'📋 Analiz Asistanı','co.analystSub':'Seviye {lvl}',
    'co.upcomingEarn':'Yaklaşan bilanço','co.upcomingDiv':'Yaklaşan kâr payı','co.now':'Şimdi',
    'co.inNDays':'{n} döngü sonra','co.sectorComp':'SEKTÖR KARŞILAŞTIRMASI','co.avg':'ort.',
    'co.dataSci':'🔬 Veri Bilimci','co.volLevel':'Oynaklık seviyesi','co.riskScore':'Risk skoru','co.beta':'Beta katsayısı',
    'co.volLow':'Düşük','co.volMid':'Orta','co.volHigh':'Yüksek',
    'co.range1w':'1H','co.range1m':'1A','co.range3m':'3A','co.range1y':'1Y','co.rangeAll':'Tümü','co.iflas':'İFLAS',
    'sent.extremeFear':'Aşırı Korku','sent.fear':'Korku','sent.neutral':'Nötr','sent.greed':'Açgözlülük','sent.extremeGreed':'Aşırı Açgözlülük',
    'regime.bull':'Yükseliş Piyasası','regime.bear':'Düşüş Piyasası','regime.side':'Yatay Piyasa',
    'cycle.expansion':'Genişleme','cycle.peak':'Zirve','cycle.recession':'Durgunluk','cycle.recovery':'Toparlanma',
    'econRow.inflation':'Enflasyon','econRow.rate':'Faiz','econRow.gdp':'Ekonomik Büyüme',
    'econRow.unemployment':'İşsizlik','econRow.consumer':'Tüketici Güveni',
    'empty.noData':'Veri yok','empty.notEnough':'Yeterli veri yok',
    'policy.backToGame':'← Oyuna Dön','policy.updated':'Son güncelleme: Ocak 2026',
    'policy.privacyTitle':'Gizlilik Politikası','policy.termsTitle':'Kullanım Şartları',
    'policy.cookiesTitle':'Çerez Politikası','policy.disclaimerTitle':'Yasal Uyarı','policy.contactTitle':'İletişim',
    'nav.guide':'📚 Rehber','nav.aboutLink':'Hakkında',
    'landing.title':'🐯 Borsa Kaplanı\'na Hoş Geldin',
    'landing.desc':'Borsa Kaplanı <b style="color:var(--text)">tamamen kurgusal bir borsa simülatörüdür</b>. Buradaki şirketler, fiyatlar ve haberler gerçek değildir. Amaç, sanal bir ortamda portföy yönetimi, haber takibi ve alım-satım pratiği yapmaktır. <b style="color:var(--warn)">Gerçek yatırım tavsiyesi sunmaz.</b>',
    'landing.start':'🎯 Oyunu Başlat',
    'landing.load':'📂 Kayıtlı Oyunu Yükle',
    'landing.aboutTitle':'Borsa Kaplanı Nedir?',
    'landing.aboutText':'<p class="tiny muted" style="line-height:1.85"><b style="color:var(--text)">Borsa Kaplanı</b>, gerçek para kullanmadan borsa dünyasını deneyimleyebileceğiniz ücretsiz bir <b style="color:var(--text)">borsa simülasyon oyunudur</b>. 55 farklı kurgusal şirket (25\'i Türkiye\'den, 30\'u global pazarlardan) üzerinden alım-satım yaparak sanal portföyünüzü büyütmeye çalışırsınız.</p><p class="tiny muted" style="line-height:1.85;margin-top:8px"><b style="color:var(--text)">Nasıl oynanır?</b> Başlangıçta 1.000 $ sanal nakit alırsınız. "Piyasa" sekmesinden bir şirket seçip grafiğini inceler, alım-satım yapabilirsiniz. "Ekibim" sekmesinden yardımcılar işe alabilirsiniz. Daha fazla bilgi için <a href="rehber/" style="color:var(--accent)">Rehber bölümümüzü</a> ziyaret edin.</p><p class="tiny muted" style="line-height:1.85;margin-top:8px"><b style="color:var(--warn)">Önemli:</b> Borsa Kaplanı hiçbir şekilde <b style="color:var(--text)">yatırım tavsiyesi vermez</b>. Tüm içerik eğitim ve eğlence amaçlıdır.</p>',
    'footer.guide':'Rehber',
    'lang.name':'Türkçe'
  }
};

let LANG = 'tr';

function detectLang(){
  try{
    const saved = localStorage.getItem('bk_lang');
    if(saved === 'en' || saved === 'tr') return saved;
    const nav = (navigator.language || navigator.userLanguage || 'tr').toLowerCase();
    if(nav.startsWith('tr')) return 'tr';
    return 'tr';
  }catch(e){ return 'tr'; }
}

function t(key, vars){
  let s = (I18N[LANG] && I18N[LANG][key]) || (I18N.tr[key]) || key;
  if(vars){
    for(const k in vars){ s = s.replace(new RegExp('\\{'+k+'\\}','g'), vars[k]); }
  }
  return s;
}

function applyTranslations(){
  document.documentElement.lang = LANG;
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.dataset.i18n;
    el.textContent = t(k);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    const k = el.dataset.i18nHtml;
    el.innerHTML = t(k);
  });
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.classList.toggle('active', b.dataset.lang === LANG);
  });
  document.title = LANG === 'tr'
    ? 'BORSA KAPLANI — Borsa Simülatörü | Sanal Yatırım Oyunu'
    : 'BORSA KAPLANI — Stock Market Simulator | Virtual Trading Game';
  const md = document.querySelector('meta[name="description"]');
  if(md) md.setAttribute('content', LANG === 'tr'
    ? 'Borsa Kaplanı ücretsiz kurgusal bir borsa simülatörüdür. Sanal portföy yönet, simüle haberleri takip et, analist çalıştır ve yatırım sezgini geliştir — gerçek para yok.'
    : 'Borsa Kaplanı is a free fictional stock market simulator. Manage a virtual portfolio, follow simulated news, hire analysts and improve your trading instincts — no real money involved.');
}

function setLang(l){
  LANG = l;
  try{ localStorage.setItem('bk_lang', l); }catch(e){}
  applyTranslations();
  if(state){ render(); }
}

/* ============================================================
   CONFIG & HELPERS
   ============================================================ */
const CONFIG = {
  BASLANGIC_NAKIT: 1000,
  KOMISYON: 0.001,
  TR_SIRKET_SAYISI: 25,
  GLOBAL_SIRKET_SAYISI: 30,
  NPC_SAYISI: 42,
  MAX_FIYAT_GECMISI: 900,
  MAX_HABER: 400,
  HABER_OLASILIK: 0.026,
  IFLAK_AKTIF: true,
  KAYIT_ANAHTARI: 'borsa_kaplani_v6',
  TICK_MS: 500,
  CYCLE_TICKS: 25,
  POLICY_EVENT_CHANCE: 0.011,
  CRASH_EVENT_CHANCE: 0.0028,
  RALLY_EVENT_CHANCE: 0.0034,
};

function mulberry32(a){
  return function(){
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
let RNG = mulberry32(123456789);
function rnd(){ return RNG(); }
function rrange(a,b){ return a + RNG()*(b-a); }
function rint(a,b){ return Math.floor(a + RNG()*(b-a+1)); }
function pickR(arr){ return arr[Math.floor(RNG()*arr.length)]; }
function gaussR(){
  let u=0,v=0;
  while(u===0)u=RNG();
  while(v===0)v=RNG();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v);
}
function clamp(v,a,b){ return v<a?a:(v>b?b:v); }
function round2(v){ return Math.round(v*100)/100; }

function fmtCash(v){
  if(!isFinite(v)) return '—';
  const neg = v<0; const a = Math.abs(v);
  return (neg?'-$':'$') + a.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
}
function fmtBig(v,dec){
  if(!isFinite(v)) return '—';
  dec = dec===undefined?2:dec;
  const neg = v<0; const a = Math.abs(v);
  let s;
  if(a>=1e12) s=(a/1e12).toFixed(dec)+'T';
  else if(a>=1e9) s=(a/1e9).toFixed(dec)+'B';
  else if(a>=1e6) s=(a/1e6).toFixed(dec)+'M';
  else if(a>=1e3) s=(a/1e3).toFixed(dec)+'K';
  else s=a.toFixed(dec);
  return (neg?'-':'')+s;
}
function fmtMoney(v,dec){
  if(!isFinite(v)) return '—';
  dec = dec===undefined?2:dec;
  const neg=v<0; const a=Math.abs(v);
  return (neg?'-$':'$')+a.toLocaleString('en-US',{minimumFractionDigits:dec,maximumFractionDigits:dec});
}
function fmtPct(v,dec){
  if(!isFinite(v)) return '—';
  dec = dec===undefined?2:dec;
  return (v>0?'+':'') + v.toFixed(dec) + '%';
}
function cls(v){ return v>0.0001?'up':(v<-0.0001?'down':'flat'); }
function esc(s){ return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function fmtTime(tick){
  const totalSec = Math.floor(tick * CONFIG.TICK_MS / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if(h > 0) return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  return String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

/* ==================== COUNTRIES ========================== */
const COUNTRIES = {
  TR: { name:'Türkiye',         flag:'🇹🇷' },
  US: { name:'USA',             flag:'🇺🇸' },
  JP: { name:'Japan',           flag:'🇯🇵' },
  DE: { name:'Germany',         flag:'🇩🇪' },
  GB: { name:'United Kingdom',  flag:'🇬🇧' },
  FR: { name:'France',          flag:'🇫🇷' },
  CN: { name:'China',           flag:'🇨🇳' },
  KR: { name:'South Korea',     flag:'🇰🇷' },
  NL: { name:'Netherlands',     flag:'🇳🇱' },
  CH: { name:'Switzerland',     flag:'🇨🇭' },
  SE: { name:'Sweden',          flag:'🇸🇪' },
  CA: { name:'Canada',          flag:'🇨🇦' }
};
const GLOBAL_CODES = ['US','US','US','US','JP','DE','GB','FR','CN','KR','NL','CH','SE','CA'];

/* ==================== SECTOR COLORS ====================== */
const SEKTOR_RENKLERI = {
  'Teknoloji':'#3b82f6','Bankacılık':'#8b5cf6','Enerji':'#f59e0b','Otomotiv':'#ef4444',
  'Sağlık':'#10b981','Gıda':'#84cc16','Perakende':'#ec4899','Telekom':'#06b6d4',
  'Madencilik':'#a16207','İnşaat':'#f97316','Savunma':'#64748b','Eğlence':'#d946ef',
  'Yazılım':'#0ea5e9','Lojistik':'#14b8a6','Havacılık':'#6366f1'
};
function shadeColor(color, percent){
  const num = parseInt(color.slice(1),16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  r = Math.max(Math.min(255,r),0); g = Math.max(Math.min(255,g),0); b = Math.max(Math.min(255,b),0);
  return '#' + (0x1000000 + (r<<16) + (g<<8) + b).toString(16).slice(1);
}
function companyLogoHTML(c, size){
  size = size || 28;
  const renk = SEKTOR_RENKLERI[c.sector] || '#3b82f6';
  const harfler = c.ticker.slice(0,2).toUpperCase();
  const fontSize = Math.round(size * 0.42);
  return `<span class="co-logo" style="width:${size}px;height:${size}px;font-size:${fontSize}px;background:linear-gradient(135deg,${renk},${shadeColor(renk,-30)})">${harfler}</span>`;
}

/* ==================== SECTORS ============================ */
const SEKTORLER = {
  Teknoloji:   { peTab:24, buyumeTab:0.10, vol:0.020, faiz:-0.9, enf:-0.3, enerji:-0.2, gsyh:0.8,  tuketim:0.3, tem:0.008, marjTab:16,
    onek:['Nova','Kuantum','Veri','Şifre','Işık','Zirve','Yörünge','Siber','Dijital'], sonek:['Teknoloji','Sistemleri','Dinamikleri','Laboratuvarı','Dijital'] },
  Bankacılık:  { peTab:11, buyumeTab:0.040,vol:0.015, faiz: 0.9, enf: 0.2, enerji: 0.0, gsyh:1.0,  tuketim:0.2, tem:0.045, marjTab:22,
    onek:['Apex','Meridyen','Sterlin','Kraliyet','Liman','Demir','Birlik','Şafak'], sonek:['Bankası','Finans','Sermaye','Holding','Güven'] },
  Enerji:      { peTab:12, buyumeTab:0.025,vol:0.022, faiz:-0.2, enf: 0.3, enerji: 1.3, gsyh:0.6,  tuketim:0.0, tem:0.050, marjTab:12,
    onek:['Titan','Helios','Petra','Volkan','Güneş','Ejder','Kor','Jeo'], sonek:['Enerji','Güç','Kaynakları','Petrol','Elektrik'] },
  Otomotiv:    { peTab:13, buyumeTab:0.030,vol:0.023, faiz:-0.7, enf:-0.4, enerji:-0.5, gsyh:1.1,  tuketim:0.9, tem:0.030, marjTab:7,
    onek:['Vertex','Kerkenez','Tork','Yolcu','Şahin','Sürat','Aks','Momentum'], sonek:['Motor','Oto','Otomotiv','Araç','Grup'] },
  Sağlık:      { peTab:20, buyumeTab:0.055,vol:0.018, faiz:-0.3, enf:-0.1, enerji:-0.1, gsyh:0.3,  tuketim:0.1, tem:0.020, marjTab:15,
    onek:['Sarmal','Vitalis','Küre','Medikal','Genom','Sağlık','Yaşam','Biyo'], sonek:['Sağlık','Medikal','İlaç','Biyobilim','Tedavi'] },
  Gıda:        { peTab:17, buyumeTab:0.030,vol:0.012, faiz:-0.3, enf: 0.4, enerji:-0.2, gsyh:0.2,  tuketim:0.3, tem:0.033, marjTab:9,
    onek:['Yeşilova','Hasat','Altın','Toprak','Bahçe','Değirmen','Kiler','Bolluk'], sonek:['Gıda','Marka','Gıda Grubu','Erzak','Beslenme'] },
  Perakende:   { peTab:15, buyumeTab:0.040,vol:0.020, faiz:-0.6, enf:-0.5, enerji:-0.3, gsyh:1.0,  tuketim:1.1, tem:0.025, marjTab:5,
    onek:['Kuzeykapı','Şehirli','Araba','Işıklı','Anayol','Kızılçizgi','Köşe','Değer'], sonek:['Market','Mağaza','Perakende','Grup','Satış'] },
  Telekom:     { peTab:14, buyumeTab:0.022,vol:0.014, faiz:-0.5, enf: 0.1, enerji:-0.2, gsyh:0.4,  tuketim:0.3, tem:0.050, marjTab:14,
    onek:['Bağlantı','Yörünge','Sinyal','Dalga','Fiber','Haber','Hava','Izgara'], sonek:['Telekom','İletişim','Ağ','Kablosuz','Holding'] },
  Madencilik:  { peTab:10, buyumeTab:0.018,vol:0.025, faiz:-0.3, enf: 0.5, enerji: 0.4, gsyh:0.9,  tuketim:0.0, tem:0.040, marjTab:18,
    onek:['Demirvadi','Derinkaya','Kızıltaş','Cevher','Granit','Bazalt','Bakır','Ocak'], sonek:['Maden','Kaynak','Mineraller','Metal','Çıkarma'] },
  İnşaat:      { peTab:12, buyumeTab:0.040,vol:0.022, faiz:-1.0, enf:-0.2, enerji:-0.3, gsyh:1.3,  tuketim:0.2, tem:0.030, marjTab:6,
    onek:['Sağlam','Atlas','Anahtar','Sütun','Kiriş','Vinç','Harç','Temel'], sonek:['İnşaat','Yapı','Mühendislik','Altyapı','Grup'] },
  Savunma:     { peTab:18, buyumeTab:0.050,vol:0.018, faiz:-0.2, enf: 0.1, enerji: 0.0, gsyh:0.4,  tuketim:0.0, tem:0.020, marjTab:10,
    onek:['Kale','Siper','Öncü','Nöbetçi','Sur','Kerkenez','Kalkan','Sınır'], sonek:['Savunma','Sistemleri','Havacılık','Silah','Teknoloji'] },
  Eğlence:     { peTab:21, buyumeTab:0.060,vol:0.023, faiz:-0.6, enf:-0.2, enerji:-0.2, gsyh:0.7,  tuketim:1.0, tem:0.010, marjTab:12,
    onek:['Yıldızışığı','Oyun','Işıklı','Sinema','Akış','Kadife','Nokta','Sahne'], sonek:['Medya','Stüdyo','Eğlence','Film','Ağ'] },
  Yazılım:     { peTab:28, buyumeTab:0.115,vol:0.024, faiz:-1.1, enf:-0.3, enerji:-0.2, gsyh:0.7,  tuketim:0.2, tem:0.004, marjTab:22,
    onek:['Kod','Veri','Yığın','Çalışma','Bulut','Senkron','Kuantum','Mantık'], sonek:['Yazılım','Çözüm','Platform','Bulut','Analitik'] },
  Lojistik:    { peTab:13, buyumeTab:0.040,vol:0.019, faiz:-0.5, enf:-0.3, enerji:-0.9, gsyh:1.2,  tuketim:0.4, tem:0.028, marjTab:8,
    onek:['Hızlıhat','Kargo','Yük','Palet','Transit','Taşıma','Rota','Yükstar'], sonek:['Lojistik','Nakliye','Taşımacılık','Kargo','Tedarik'] },
  Havacılık:   { peTab:12, buyumeTab:0.040,vol:0.024, faiz:-0.8, enf:-0.4, enerji:-1.2, gsyh:1.1,  tuketim:0.8, tem:0.015, marjTab:7,
    onek:['Göksel','Aero','Zirve','Yüksekhat','Kuyruklu','Stratos','Kanat','Seyir'], sonek:['Havayolları','Havacılık','Hava','Uçuş','Grup'] }
};
const SEKTOR_ADLARI = Object.keys(SEKTORLER);

const GLOBAL_ONEK = ['Global','United','Pacific','Atlantic','Continental','Imperial','Royal','Prime','Universal','Pioneer','Vanguard','Summit','Sterling','Zenith','Alpha','Omega','Delta','Vertex','Atlas','Orion','Helios','Titan','Vortex','Helix','Quantum','Cobalt','Onyx','Nimbus','Astra','Sigma','Krypton','Photon','Chrono','Nexon','Cygnus'];
const GLOBAL_SONEK = ['Group','Corp','Holdings','Industries','Systems','Solutions','Partners','Ventures','Capital','Alliance','Technologies','Enterprises','International','Global','Dynamics','Union','Consortium'];

const EVRELER = {
  Genişleme:   { gsyh: 2.4,  enf: 2.4 },
  Zirve:       { gsyh: 1.2,  enf: 4.0 },
  Durgunluk:   { gsyh: -1.8, enf: 1.4 },
  Toparlanma:  { gsyh: 2.2,  enf: 1.8 }
};
const EVRE_GECIS = {
  Genişleme:  [['Zirve',0.014],['Durgunluk',0.004]],
  Zirve:      [['Durgunluk',0.024],['Genişleme',0.012]],
  Durgunluk:  [['Toparlanma',0.028],['Zirve',0.003]],
  Toparlanma: [['Genişleme',0.024],['Durgunluk',0.006]]
};

/* ============================ EMPLOYEES ========================= */
const CALISANLAR = [
  { id:'analiz_asistani', icon:'📋', name:'Analysis Assistant', name_tr:'Analiz Asistanı', desc:'Reveals extra company info.', desc_tr:'Şirket sayfasında ek bilgiler açar.',
    seviyeler:[
      { fiyat:400,  bonus:'Upcoming earnings and dividend dates visible', bonus_tr:'Yaklaşan bilanço ve kâr payı tarihleri görünür' },
      { fiyat:1500, bonus:'Sector comparison (P/E, margin) added', bonus_tr:'Sektör karşılaştırması eklenir (F/K, marj)' },
      { fiyat:5000, bonus:'Major events highlighted in news history', bonus_tr:'Haber geçmişinde önemli olaylar işaretlenir' }
    ]},
  { id:'borsa_analisti', icon:'📊', name:'Market Analyst', name_tr:'Borsa Analisti', desc:'Reduces trade commission.', desc_tr:'İşlem komisyonunu azaltır.',
    seviyeler:[
      { fiyat:500,  bonus:'Commission 0.10% → 0.09%', bonus_tr:'Komisyon %0,10 → %0,09' },
      { fiyat:2000, bonus:'Commission 0.09% → 0.08%', bonus_tr:'Komisyon %0,09 → %0,08' },
      { fiyat:8000, bonus:'Commission 0.08% → 0.07%', bonus_tr:'Komisyon %0,08 → %0,07' }
    ]},
  { id:'veri_bilimci', icon:'🔬', name:'Data Scientist', name_tr:'Veri Bilimci', desc:'Unlocks market data.', desc_tr:'Piyasa verilerine erişim sağlar.',
    seviyeler:[
      { fiyat:700,   bonus:'Volatility shown in Analyst View', bonus_tr:'Uzman görüşünde volatilite seviyesi görünür' },
      { fiyat:2800,  bonus:'Sector heatmap (Analyst View)', bonus_tr:'Sektör ısı haritası (Uzman Görüşü sekmesi)' },
      { fiyat:11000, bonus:'Numeric risk score shown', bonus_tr:'Şirket risk skoru sayısal olarak görünür' }
    ]},
  { id:'portfoy_danismani', icon:'💼', name:'Portfolio Advisor', name_tr:'Portföy Danışmanı', desc:'Provides portfolio analysis.', desc_tr:'Portföy analizi sunar.',
    seviyeler:[
      { fiyat:800,   bonus:'Highlights your weakest position', bonus_tr:'En zayıf pozisyonun vurgulanır' },
      { fiyat:3200,  bonus:'Portfolio health score', bonus_tr:'Portföy sağlık skoru' },
      { fiyat:12000, bonus:'Concentration & diversification warnings', bonus_tr:'Yoğunlaşma ve çeşitlendirme uyarısı' }
    ]},
];

function empName(e){ return LANG === 'tr' ? e.name_tr : e.name; }
function empDesc(e){ return LANG === 'tr' ? e.desc_tr : e.desc; }
function empLvlText(e,i){ return LANG === 'tr' ? e.seviyeler[i].bonus_tr : e.seviyeler[i].bonus; }

function getEmployeeLevel(id){
  if(!state || !state.player || !state.player.employees) return 0;
  return state.player.employees[id] || 0;
}
function defaultEmployees(){
  const o = {};
  for(const e of CALISANLAR) o[e.id] = 0;
  return o;
}
function getCommission(){
  const lvl = getEmployeeLevel('borsa_analisti');
  return Math.max(0.0007, CONFIG.KOMISYON - lvl * 0.0001);
}

/* ============================ STATE ============================== */
let state = null;
function getCompany(id){
  for(let i=0;i<state.companies.length;i++) if(state.companies[i].id===id) return state.companies[i];
  return null;
}
function aliveCompanies(){ return state.companies.filter(c=>c.alive); }

/* ======================= ECONOMY =========================== */
function initEconomy(){
  const evre = pickR(['Genişleme','Genişleme','Zirve','Durgunluk','Toparlanma']);
  const e = {};
  e.evre = evre;
  e.enflasyon = clamp(rrange(1.2,4.0),0,10);
  e.faiz = clamp(e.enflasyon + rrange(-0.3,1.5),0,10);
  e.issizlik = rrange(4.2,6.5);
  e.gsyhBuyume = rrange(-0.5,3.0);
  e.tuketiciGuveni = rrange(90,112);
  e.enerjiFiyati = rrange(62,100);
  e.piyasaKorkusu = rrange(15,38);
  e.duygu = clamp(100 - e.piyasaKorkusu + rrange(-6,6),0,100);
  e.policyRate = 0;
  e.qeActive = false;
  e.taxRate = 22;
  e.regulationLevel = 50;
  e.prev = {};
  for(const k in e){ if(typeof e[k]==='number') e.prev[k]=e[k]; }
  state.economy = e;
}

function pushEconomyHistory(){
  const e = state.economy;
  state.economyHistory.push({
    d: state.cycle,
    enflasyon: round2(e.enflasyon), faiz: round2(e.faiz),
    issizlik: round2(e.issizlik), gsyh: round2(e.gsyhBuyume),
    tuketici: round2(e.tuketiciGuveni), enerji: round2(e.enerjiFiyati),
    korku: round2(e.piyasaKorkusu), duygu: round2(e.duygu),
    tax: round2(e.taxRate), reg: round2(e.regulationLevel)
  });
  if(state.economyHistory.length > 2000) state.economyHistory.shift();
}

/* =========== POLICY NEWS ============ */
const POLICY_HEADLINES = {
  en: [
    { t:'Central bank signals a hawkish stance for next quarter', tone:-1, tag:'rate' },
    { t:'Government announces corporate tax cut to boost investment', tone:1, tag:'tax' },
    { t:'New financial regulation bill introduced in parliament', tone:-1, tag:'reg' },
    { t:'Regulators tighten scrutiny on large-cap technology firms', tone:-1, tag:'reg' },
    { t:'Fiscal stimulus package approved to support consumer spending', tone:1, tag:'fiscal' },
    { t:'Trade agreement signed with major partner economies', tone:1, tag:'trade' },
    { t:'New environmental compliance rules announced for industry', tone:-1, tag:'reg' },
    { t:'Central bank hints at possible rate cut next meeting', tone:1, tag:'rate' },
    { t:'Government unveils infrastructure investment plan', tone:1, tag:'fiscal' },
    { t:'Antitrust investigation opened into dominant market players', tone:-1, tag:'reg' },
    { t:'Subsidy program introduced for strategic sectors', tone:1, tag:'fiscal' },
    { t:'Capital controls debated amid currency pressure', tone:-1, tag:'reg' }
  ],
  tr: [
    { t:'Merkez bankası gelecek çeyrek için şahin duruş sinyali verdi', tone:-1, tag:'rate' },
    { t:'Hükümet yatırımı artırmak için kurumlar vergisini indirdi', tone:1, tag:'tax' },
    { t:'Parlamentoya yeni finansal düzenleme tasarısı sunuldu', tone:-1, tag:'reg' },
    { t:'Düzenleyiciler büyük teknoloji şirketlerine yönelik denetimi sıkılaştırdı', tone:-1, tag:'reg' },
    { t:'Tüketici harcamasını desteklemek için mali teşvik paketi onaylandı', tone:1, tag:'fiscal' },
    { t:'Büyük ortak ekonomilerle ticaret anlaşması imzalandı', tone:1, tag:'trade' },
    { t:'Sanayi için yeni çevresel uyum kuralları açıklandı', tone:-1, tag:'reg' },
    { t:'Merkez bankası gelecek toplantıda olası faiz indirimine işaret etti', tone:1, tag:'rate' },
    { t:'Hükümet altyapı yatırım planını açıkladı', tone:1, tag:'fiscal' },
    { t:'Piyasaya hakim oyunculara yönelik rekabet soruşturması başlatıldı', tone:-1, tag:'reg' },
    { t:'Stratejik sektörler için teşvik programı başlatıldı', tone:1, tag:'fiscal' },
    { t:'Kur baskısı altında sermaye kontrolleri tartışılıyor', tone:-1, tag:'reg' }
  ]
};

function applyPolicyEvent(){
  const pool = POLICY_HEADLINES[LANG] || POLICY_HEADLINES.tr;
  const ev = pickR(pool);
  const e = state.economy;
  if(ev.tag === 'rate'){
    e.faiz = clamp(e.faiz + (ev.tone>0?-0.35:0.4), 0, 18);
  } else if(ev.tag === 'tax'){
    e.taxRate = clamp(e.taxRate + (ev.tone>0?-2.5:2.5), 8, 40);
  } else if(ev.tag === 'reg'){
    e.regulationLevel = clamp(e.regulationLevel + (ev.tone>0?-4:6), 5, 95);
  } else if(ev.tag === 'fiscal'){
    e.gsyhBuyume += (ev.tone>0?0.35:-0.3);
    e.tuketiciGuveni += (ev.tone>0?1.8:-1.5);
  }
  addMacroNews('policy', ev.t, ev.tone * 0.55, null, Math.abs(ev.tone) > 0.9);
}

function updateEconomy(){
  const e = state.economy;
  const t = EVRELER[e.evre];
  const trans = EVRE_GECIS[e.evre] || [];
  for(const [np, chance] of trans){
    if(rnd() < chance){
      e.evre = np;
      addMacroNews('cycle', t('cycle.'+np.toLowerCase()) , 0);
      break;
    }
  }
  e.gsyhBuyume += (t.gsyh - e.gsyhBuyume) * 0.045 + gaussR()*0.055;
  e.gsyhBuyume = clamp(e.gsyhBuyume, -7, 7);
  const ti = clamp(4.4 + (2.4 - e.gsyhBuyume) * 0.85, 2, 15);
  e.issizlik += (ti - e.issizlik) * 0.035 + gaussR()*0.030;
  e.issizlik = clamp(e.issizlik, 2, 18);
  const ef = t.enf + ((e.enerjiFiyati-80)/80)*0.9 + (e.gsyhBuyume-2)*0.12 + (e.qeActive?0.35:0);
  e.enflasyon += (ef - e.enflasyon) * 0.032 + gaussR()*0.07;
  e.enflasyon = clamp(e.enflasyon, -2, 16);
  const nf = clamp(e.enflasyon + 1.0 + e.gsyhBuyume*0.38, 0, 15);
  if(state.cycle % 45 === 0 && state.cycle > 0){
    const adim = clamp(nf - e.faiz, -0.55, 0.55);
    if(Math.abs(adim) > 0.09){
      e.faiz = clamp(e.faiz + adim, 0, 18);
      const msg = LANG === 'tr'
        ? 'Merkez bankası politika faizini ' + Math.abs(adim).toFixed(2) + ' puan ' + (adim>0?'artırdı':'indirdi') + ' → %' + e.faiz.toFixed(2)
        : 'Central bank ' + (adim>0?'raised':'cut') + ' policy rate by ' + Math.abs(adim).toFixed(2) + ' pts → ' + e.faiz.toFixed(2) + '%';
      addMacroNews('rate', msg, adim>0?-0.6:0.6, null, true);
    }
  } else {
    e.faiz += (nf - e.faiz) * 0.006;
    e.faiz = clamp(e.faiz, 0, 18);
  }
  e.enerjiFiyati *= (1 + gaussR()*0.012 + (e.gsyhBuyume-2)*0.0006);
  e.enerjiFiyati += (82 - e.enerjiFiyati) * 0.004;
  if(rnd() < 0.006){
    const sok = rrange(-0.20, 0.28);
    e.enerjiFiyati *= (1+sok);
    const msg = LANG === 'tr'
      ? (sok>0?'Enerji arz şoku petrol fiyatlarını yukarı çekti':'Enerji arzı bolluğu petrolü aşağı çekti')
      : (sok>0?'Energy supply shock pushed oil prices higher':'Energy oversupply pushed oil prices lower');
    addMacroNews('energy', msg, sok>0?-0.7:0.55, null, true);
  }
  e.enerjiFiyati = clamp(e.enerjiFiyati, 28, 230);
  const tk = 100 + e.gsyhBuyume*4.0 - (e.issizlik-5)*3.0 - (e.enflasyon-2.4)*1.5;
  e.tuketiciGuveni += (tk - e.tuketiciGuveni) * 0.05 + gaussR()*0.9;
  e.tuketiciGuveni = clamp(e.tuketiciGuveni, 28, 168);

  const mh = state.market.indexHistory;
  let ret20 = 0;
  if(mh.length > 21){
    const a = mh[mh.length-21].value, b = mh[mh.length-1].value;
    if(a>0) ret20 = (b-a)/a;
  }
  const kh = clamp(46 - ret20*300 + (e.issizlik-5)*1.1 + Math.max(0, e.enflasyon-4)*1.8, 2, 95);
  e.piyasaKorkusu += (kh - e.piyasaKorkusu) * 0.085 + gaussR()*1.4;
  e.piyasaKorkusu = clamp(e.piyasaKorkusu, 2, 95);
  const dh = clamp(50 + ret20*280 - (e.piyasaKorkusu-50)*0.55 + (e.gsyhBuyume-2)*3.2, 2, 98);
  e.duygu += (dh - e.duygu) * 0.06 + gaussR()*1.1;
  e.duygu = clamp(e.duygu, 2, 98);

  if(state.cycle % 20 === 0 && state.cycle > 0){
    const inflMsg = LANG === 'tr' ? 'Enflasyon verisi açıklandı: %' + e.enflasyon.toFixed(2) : 'Inflation data released: ' + e.enflasyon.toFixed(2) + '%';
    addMacroNews('inflation', inflMsg, (e.enflasyon < (e.prev.enflasyon||e.enflasyon)) ? 0.35 : -0.35);
    const jobsMsg = LANG === 'tr' ? 'İşsizlik oranı %' + e.issizlik.toFixed(2) + ' olarak açıklandı' : 'Unemployment rate announced at ' + e.issizlik.toFixed(2) + '%';
    addMacroNews('jobs', jobsMsg, (e.issizlik < 5) ? 0.25 : -0.25);
  }
  if(state.cycle % 60 === 0 && state.cycle > 0){
    const gdpMsg = LANG === 'tr' ? 'Ekonomik büyüme yıllık %' + e.gsyhBuyume.toFixed(2) + ' açıklandı' : 'Annual economic growth announced at ' + e.gsyhBuyume.toFixed(2) + '%';
    addMacroNews('gdp', gdpMsg, e.gsyhBuyume > 2 ? 0.4 : -0.4);
  }
  if(rnd() < 0.005){
    const pool = LANG === 'tr' ? [
      'Jeopolitik gerilim küresel piyasaları sarstı',
      'Büyük ekonomiler arasında ticaret anlaşmazlığı büyüdü',
      'Doğal afet bölgesel tedarik zincirini vurdu'
    ] : [
      'Geopolitical tensions shook global markets',
      'Trade dispute grew between major economies',
      'Natural disaster hit regional supply chain'
    ];
    addMacroNews('geo', pickR(pool), -0.55, null, true);
  }
  if(rnd() < CONFIG.POLICY_EVENT_CHANCE){
    applyPolicyEvent();
  }
  if(rnd() < CONFIG.CRASH_EVENT_CHANCE){
    const msg = LANG === 'tr' ? '⚠️ Piyasa çöküşü: Panik satışları tetiklendi' : '⚠️ Market crash: panic selling triggered';
    addMacroNews('crisis', msg, -1.4, null, true);
    e.piyasaKorkusu = clamp(e.piyasaKorkusu + 22, 2, 98);
    for(const c of state.companies){ c.newsImpact = clamp(c.newsImpact - 0.10, -0.28, 0.28); }
  }
  if(rnd() < CONFIG.RALLY_EVENT_CHANCE){
    const msg = LANG === 'tr' ? '🚀 Güçlü alım dalgası piyasayı yukarı taşıdı' : '🚀 Strong buying wave lifted the market';
    addMacroNews('rally', msg, 1.1, null, true);
    e.piyasaKorkusu = clamp(e.piyasaKorkusu - 18, 2, 98);
    for(const c of state.companies){ c.newsImpact = clamp(c.newsImpact + 0.07, -0.28, 0.28); }
  }
  for(const k in e){ if(typeof e[k]==='number') e.prev[k] = e[k]; }
}

function updateSectors(){
  const e = state.economy;
  for(const name of SEKTOR_ADLARI){
    const sec = SEKTORLER[name];
    const st = state.sectors[name];
    let hedef = 50;
    hedef += (e.faiz - 3.0) * sec.faiz * 3.6;
    hedef += ((e.enerjiFiyati-82)/82) * sec.enerji * 16;
    hedef += (e.enflasyon - 2.5) * sec.enf * 3.4;
    hedef += (e.gsyhBuyume - 2.0) * sec.gsyh * 4.2;
    hedef += ((e.tuketiciGuveni - 100)/10) * sec.tuketim * 4.8;
    hedef += gaussR()*1.4;
    hedef = clamp(hedef, 4, 96);
    const eski = st.duygu;
    st.duygu += (hedef - st.duygu) * 0.055;
    st.duygu = clamp(st.duygu, 2, 98);
    st.momentum = (st.duygu - eski) / 100;
  }
}

/* ======================= COMPANY ENGINE ============================ */
function uniqueName(sektorAdi, country){
  const sec = SEKTORLER[sektorAdi];
  const isTR = country === 'TR';
  for(let attempt=0; attempt<80; attempt++){
    let n;
    if(isTR) n = pickR(sec.onek) + ' ' + pickR(sec.sonek);
    else n = pickR(GLOBAL_ONEK) + ' ' + pickR(GLOBAL_SONEK);
    if(!state.usedNames.includes(n)){ state.usedNames.push(n); return n; }
  }
  let n = isTR
    ? (pickR(sec.onek) + ' ' + pickR(sec.sonek) + ' ' + rint(2,99))
    : (pickR(GLOBAL_ONEK) + ' ' + pickR(GLOBAL_SONEK) + ' ' + rint(2,99));
  state.usedNames.push(n);
  return n;
}
function uniqueTicker(name){
  const t = name.toUpperCase()
    .replace(/İ/g,'I').replace(/Ş/g,'S').replace(/Ğ/g,'G')
    .replace(/Ü/g,'U').replace(/Ö/g,'O').replace(/Ç/g,'C')
    .replace(/[^A-Z ]/g,'');
  const p = t.split(' ').filter(x=>x.length>0);
  let base = (p[0]||'XXX').slice(0,3) + ((p[1]||'X')[0]||'X');
  base = base.slice(0,4);
  let tk = base, i = 1;
  while(state.usedTickers.includes(tk)){
    tk = base.slice(0,3) + String.fromCharCode(64+i);
    i++;
    if(i>26){ tk = base + rint(10,99); }
  }
  state.usedTickers.push(tk);
  return tk;
}

function createCompany(sektorAdi, countryParam){
  const sec = SEKTORLER[sektorAdi];
  const country = !countryParam || countryParam === 'TR' ? 'TR' : (countryParam === 'GLOBAL' ? pickR(GLOBAL_CODES) : countryParam);
  const name = uniqueName(sektorAdi, country);
  const ticker = uniqueTicker(name);
  const shares = Math.round(rrange(80e6, 800e6));
  const marj = clamp(sec.marjTab * rrange(0.6, 1.4), 2.5, 36);
  const eps = rrange(0.25, 3.0);
  const profit = eps * shares;
  const revenue = clamp(profit / (marj/100), 3e8, 5e11);
  const gercekMarj = (profit/revenue)*100;
  const pe = sec.peTab * rrange(0.72, 1.28);
  const price = Math.max(1.5, eps * pe);
  const growth = clamp(sec.buyumeTab*100 * rrange(0.3, 1.9) + gaussR()*2.2, -8, 30);
  const volatility = clamp(sec.vol * rrange(0.9, 1.7), 0.010, 0.045);
  const debtRatio = rrange(0.10, 0.75);
  const debt = revenue * debtRatio;
  const cash = revenue * rrange(0.06, 0.30);

  const c = {
    id: state.nextCompanyId++,
    name, ticker, sector: sektorAdi,
    country, flag: COUNTRIES[country].flag, countryName: COUNTRIES[country].name,
    price: round2(price),
    prevClose: round2(price),
    open: round2(price), high: round2(price), low: round2(price), close: round2(price),
    changePct: 0, momentum: 0,
    shares, marketCap: price*shares,
    revenue, expenses: revenue - profit, profit, eps,
    cash, debt, assets: cash + revenue * rrange(0.8, 1.9),
    employees: Math.round(revenue / rrange(200000, 900000)) + rint(200,5000),
    customers: Math.round(revenue / rrange(80, 900)) + rint(1000,50000),
    growth, profitMargin: gercekMarj,
    innovation: clamp(50 + gaussR()*18, 5, 95),
    management: clamp(50 + gaussR()*16, 5, 95),
    brandStrength: clamp(50 + gaussR()*18, 5, 95),
    competition: clamp(50 + gaussR()*16, 5, 95),
    risk: clamp(30 + (volatility*900) + debtRatio*26 + gaussR()*9, 3, 95),
    dividendYield: clamp(sec.tem*100 * rrange(0, 1.5), 0, 8),
    sentiment: clamp(50 + gaussR()*14, 5, 95),
    volatility, beta: clamp(0.7 + sec.gsyh*0.5 + gaussR()*0.20, 0.4, 1.9),
    expectedGrowth: 0, newsImpact: 0, npcDemand: 0, avgVolume: 0, volume: 0,
    distress: 0, distressedWarned: false, alive: true,
    qProfits: [], nextEarnings: rint(20, 63), nextDividend: rint(30, 63),
    priceHistory: [], newsLog: [], lastChange: 0
  };
  c.expectedGrowth = clamp(c.growth + gaussR()*2.5, -8, 28);
  c.avgVolume = Math.round(shares * rrange(0.0015, 0.0055));

  let p = c.price * rrange(0.90, 1.10);
  for(let i=40;i>=1;i--){
    const ch = gaussR()*c.volatility*0.5;
    p = Math.max(0.5, p * (1+ch));
    const o = p;
    const cl = Math.max(0.5, p * (1 + gaussR()*c.volatility*0.3));
    const hi = Math.max(o,cl) * (1 + Math.abs(gaussR())*c.volatility*0.3);
    const lo = Math.max(0.3, Math.min(o,cl) * (1 - Math.abs(gaussR())*c.volatility*0.3));
    c.priceHistory.push({ d: -(i), o: round2(o), h: round2(hi), l: round2(lo), c: round2(cl), v: Math.round(c.avgVolume*rrange(0.5,1.6)) });
    p = cl;
  }
  c.price = round2(p * rrange(0.98, 1.02));
  c.prevClose = c.price; c.open = c.price; c.high = c.price; c.low = c.price; c.close = c.price;
  c.marketCap = c.price * c.shares;
  c.eps = c.profit / c.shares;
  return c;
}

function initCompanies(){
  state.companies = [];
  for(const s of SEKTOR_ADLARI){
    state.companies.push(createCompany(s, 'TR'));
    state.companies.push(createCompany(s, 'GLOBAL'));
    state.companies.push(createCompany(s, 'GLOBAL'));
  }
  while(state.companies.filter(c=>c.country === 'TR').length < CONFIG.TR_SIRKET_SAYISI){
    state.companies.push(createCompany(pickR(SEKTOR_ADLARI), 'TR'));
  }
  for(let i=state.companies.length-1;i>0;i--){
    const j = Math.floor(RNG()*(i+1));
    [state.companies[i], state.companies[j]] = [state.companies[j], state.companies[i]];
  }
}

function updateCompanies(){
  const e = state.economy;
  for(const c of state.companies){
    if(!c.alive) continue;
    const sec = SEKTORLER[c.sector];
    const sekDuygu = state.sectors[c.sector].duygu;
    const talepMod =
      1
      + (e.gsyhBuyume - 2.0) * 0.012 * sec.gsyh
      + ((e.tuketiciGuveni - 100) * 0.0018) * sec.tuketim
      - (e.enflasyon - 2.4) * 0.005
      + (sekDuygu - 50) * 0.0013
      + (c.innovation - 50) * 0.0007
      - (c.competition - 50) * 0.0009
      - Math.max(0, (c.debt / Math.max(c.revenue,1) - 0.7)) * 0.04
      - (e.regulationLevel - 50) * 0.0008;

    const gunlukB = (c.growth / 100) / 252 * clamp(talepMod, 0.4, 1.6);
    c.revenue *= (1 + gunlukB + gaussR()*0.0022);
    c.revenue = clamp(c.revenue, 5e7, 3e12);

    let marjDelta =
      -(e.enflasyon - 2.4) * 0.014
      - ((e.enerjiFiyati - 82)/82) * Math.max(0, -sec.enerji) * 0.30
      + ((e.enerjiFiyati - 82)/82) * Math.max(0, sec.enerji) * 0.24
      + (c.innovation - 50) * 0.00035
      - (c.competition - 50) * 0.0004
      + (c.management - 50) * 0.0003
      - (e.regulationLevel - 50) * 0.00012
      + gaussR() * 0.012;
    c.profitMargin = clamp(c.profitMargin + marjDelta, -40, 50);

    c.expenses = c.revenue * (1 - c.profitMargin/100);
    c.profit = c.revenue - c.expenses;
    c.profit = c.profit * (1 - e.taxRate/100 * 0.35);
    c.eps = c.profit / c.shares;

    const gunlukKar = c.profit / 252;
    const faizMaliyet = c.debt * (e.faiz/100) / 252;
    c.cash += gunlukKar * 0.60 - faizMaliyet;
    if(c.cash < 0){ c.debt += -c.cash; c.cash = 0; c.distress += 1.0; }
    else {
      c.debt *= (1 + 0.00013);
      if(c.profit > 0 && c.debt > c.revenue*0.9){
        const ode = Math.min(c.cash*0.04, c.debt*0.003);
        c.cash -= ode; c.debt -= ode;
      }
    }
    c.debt = clamp(c.debt, 0, 2e12);
    c.cash = clamp(c.cash, 0, 2e12);
    c.assets = c.cash + c.revenue * 1.10 + c.brandStrength * 1e6;
    c.marketCap = c.price * c.shares;

    c.innovation = clamp(c.innovation + gaussR()*0.14, 3, 97);
    c.management = clamp(c.management + gaussR()*0.10, 3, 97);
    c.brandStrength = clamp(c.brandStrength + gaussR()*0.12, 3, 97);
    c.competition = clamp(c.competition + gaussR()*0.12, 3, 97);
    c.employees = Math.max(50, Math.round(c.employees * (1 + 0.00010 + gaussR()*0.0004)));
    c.customers = Math.max(100, Math.round(c.customers * (1 + 0.00015 + gaussR()*0.0009)));

    const bHedef = sec.buyumeTab*100 * (0.6 + (c.innovation/100)*0.9) + (sekDuygu-50)*0.05;
    c.growth += (bHedef - c.growth) * 0.012 + gaussR()*0.18;
    c.growth = clamp(c.growth, -12, 34);

    const rh = clamp(22 + c.volatility*900 + (c.debt/Math.max(c.revenue,1))*26 + (c.profit<0?15:0) - (c.management-50)*0.20, 2, 96);
    c.risk += (rh - c.risk) * 0.04;
    c.risk = clamp(c.risk, 2, 96);

    const dh = clamp(50 + (c.growth*0.9) + (c.profitMargin*0.45) - (c.risk*0.4) + (sekDuygu-50)*0.45 + gaussR()*3.5, 2, 96);
    c.sentiment += (dh - c.sentiment) * 0.05;
    c.sentiment = clamp(c.sentiment, 2, 96);

    let stres = 0;
    if(c.profit < 0) stres += 1;
    if(c.debt > c.revenue * 1.5) stres += 1;
    if(c.cash < c.revenue * 0.03) stres += 1;
    if(c.eps <= 0 && c.price < 1.5) stres += 1;
    if(stres >= 2) c.distress += 1;
    else c.distress = Math.max(0, c.distress - 1.2);

    if(c.distress > 14 && !c.distressedWarned){
      c.distressedWarned = true;
      const hl = LANG === 'tr' ? c.name + ' finansal baskı altında' : c.name + ' under financial pressure';
      addCompanyNews(c, 'custom', hl, -1);
    }
    if(c.distress < 6) c.distressedWarned = false;

    if(CONFIG.IFLAK_AKTIF && c.distress > 65 && rnd() < 0.14) bankruptCompany(c);
  }
}

function bankruptCompany(c){
  c.alive = false;
  c.price = round2(Math.max(0.05, c.price*0.15));
  const hl = LANG === 'tr'
    ? c.name + ' (' + c.ticker + ') iflas koruma başvurusu yaptı'
    : c.name + ' (' + c.ticker + ') filed for bankruptcy protection';
  addMacroNews('crisis', hl, -1.1, c.id, true);
  toast(t('common.bankrupt',{name:c.name}), 'err');
  const idx = state.companies.indexOf(c);
  if(idx >= 0){
    const nc = createCompany(c.sector, c.country);
    nc.priceHistory = [];
    for(let i=30;i>=1;i--){
      nc.priceHistory.push({ d: -i, o: round2(nc.price), h: round2(nc.price), l: round2(nc.price), c: round2(nc.price), v: 0 });
    }
    state.companies[idx] = nc;
  }
}

/* ========================= NEWS ENGINE =========================== */
const HABER_SABLONLARI = [
  { id:'product', w:10, tone:1, imp:0.022, cat:'company', mag:false,
    h_en:c=>`${c.name} unveiled a new product family`,
    h_tr:c=>`${c.name} yeni ürün ailesini tanıttı`,
    fx:{ innovation:1.8, brandStrength:0.9, sentiment:2.4 } },
  { id:'recall', w:5, tone:-1, imp:-0.032, cat:'company', mag:false,
    h_en:c=>`${c.name} issued a product recall`,
    h_tr:c=>`${c.name} ürünlerini geri çağırdı`,
    fx:{ brandStrength:-2.5, sentiment:-5 } },
  { id:'factory', w:6, tone:1, imp:0.018, cat:'company', mag:false,
    h_en:c=>`${c.name} opened a new production facility`,
    h_tr:c=>`${c.name} yeni üretim tesisi açtı`,
    fx:{ growth:0.7, innovation:0.8, employees:0.03 } },
  { id:'halt', w:5, tone:-1, imp:-0.028, cat:'company', mag:false,
    h_en:c=>`Production halted at ${c.name}'s plant`,
    h_tr:c=>`${c.name} fabrikasında üretim durdu`,
    fx:{ growth:-0.9, sentiment:-4 } },
  { id:'lawsuit', w:6, tone:-1, imp:-0.026, cat:'company', mag:false,
    h_en:c=>`Lawsuit filed against ${c.name}`,
    h_tr:c=>`${c.name} hakkında dava açıldı`,
    fx:{ sentiment:-3.5, risk:2.4 } },
  { id:'scandal', w:3, tone:-1, imp:-0.060, cat:'company', mag:true,
    h_en:c=>`${c.name} shaken by accounting scandal`,
    h_tr:c=>`${c.name} muhasebe skandalıyla sarsıldı`,
    fx:{ management:-7, brandStrength:-5, sentiment:-11, risk:7 } },
  { id:'contract', w:8, tone:1, imp:0.042, cat:'company', mag:false,
    h_en:c=>`${c.name} won a major supply contract`,
    h_tr:c=>`${c.name} büyük tedarik sözleşmesi kazandı`,
    fx:{ growth:1.4, customers:0.024, sentiment:4 } },
  { id:'lostcust', w:6, tone:-1, imp:-0.044, cat:'company', mag:false,
    h_en:c=>`${c.name} lost a key customer`,
    h_tr:c=>`${c.name} kilit müşterisini kaybetti`,
    fx:{ growth:-1.5, customers:-0.028, sentiment:-5 } },
  { id:'upgrade', w:9, tone:1, imp:0.018, cat:'company', mag:false,
    h_en:c=>`Analysts raised ${c.name} price target`,
    h_tr:c=>`Analistler ${c.name} hedefini yükseltti`,
    fx:{ sentiment:2.6 } },
  { id:'downgrade', w:9, tone:-1, imp:-0.020, cat:'company', mag:false,
    h_en:c=>`Analysts cut ${c.name} price target`,
    h_tr:c=>`Analistler ${c.name} hedefini düşürdü`,
    fx:{ sentiment:-2.6 } },
  { id:'buyback', w:5, tone:1, imp:0.019, cat:'company', mag:false,
    h_en:c=>`${c.name} announced a share buyback program`,
    h_tr:c=>`${c.name} hisse geri alım programı açıkladı`,
    fx:{ sentiment:1.8 } },
  { id:'dividendup', w:5, tone:1, imp:0.022, cat:'dividend', mag:false,
    h_en:c=>`${c.name} raised its dividend`,
    h_tr:c=>`${c.name} kâr payını artırdı`,
    fx:{ sentiment:2.4 } },
  { id:'dividendcut', w:4, tone:-1, imp:-0.036, cat:'dividend', mag:false,
    h_en:c=>`${c.name} cut its dividend`,
    h_tr:c=>`${c.name} kâr payını kesti`,
    fx:{ sentiment:-5.5, risk:2.8 } },
  { id:'ceo', w:5, tone:0, imp:-0.008, cat:'company', mag:false,
    h_en:c=>`${c.name} announced a CEO change`,
    h_tr:c=>`${c.name} genel müdür değişikliği duyurdu`,
    fx:{ management:-1.0 } },
  { id:'layoffs', w:5, tone:0, imp:0.010, cat:'company', mag:false,
    h_en:c=>`${c.name} is restructuring its workforce`,
    h_tr:c=>`${c.name} işgücünü yeniden yapılandırıyor`,
    fx:{ profitMargin:0.4, sentiment:-1.5, employees:-0.035 } },
  { id:'breach', w:4, tone:-1, imp:-0.032, cat:'company', mag:false,
    h_en:c=>`Data breach detected at ${c.name}`,
    h_tr:c=>`${c.name}'da veri ihlali tespit edildi`,
    fx:{ brandStrength:-2.5, sentiment:-5, risk:2.8 } },
  { id:'partner', w:7, tone:1, imp:0.024, cat:'company', mag:false,
    h_en:c=>`${c.name} formed a strategic partnership`,
    h_tr:c=>`${c.name} stratejik ortaklık kurdu`,
    fx:{ growth:0.8, brandStrength:1.1, sentiment:2.4 } },
  { id:'probe', w:5, tone:-1, imp:-0.030, cat:'company', mag:false,
    h_en:c=>`Regulators opened an investigation into ${c.name}`,
    h_tr:c=>`Regülatörler ${c.name} hakkında soruşturma açtı`,
    fx:{ sentiment:-4.5, risk:4.4 } },
  { id:'expansion', w:6, tone:1, imp:0.023, cat:'company', mag:false,
    h_en:c=>`${c.name} expanded into new markets`,
    h_tr:c=>`${c.name} yeni pazarlara açıldı`,
    fx:{ growth:1.0, customers:0.018 } },
  { id:'supply', w:6, tone:-1, imp:-0.024, cat:'company', mag:false,
    h_en:c=>`Supply issues pressure ${c.name}`,
    h_tr:c=>`Tedarik sorunları ${c.name}'ı baskılıyor`,
    fx:{ profitMargin:-0.5, sentiment:-2.5 } },
  { id:'patent', w:5, tone:1, imp:0.026, cat:'company', mag:false,
    h_en:c=>`${c.name} secured a new patent`,
    h_tr:c=>`${c.name} yeni patent onayı aldı`,
    fx:{ innovation:3.0, sentiment:2.8 } },
  { id:'insider', w:4, tone:1, imp:0.014, cat:'company', mag:false,
    h_en:c=>`Insider buying increased at ${c.name}`,
    h_tr:c=>`${c.name}'da içeriden alımlar arttı`,
    fx:{ sentiment:1.8 } },
  { id:'shortreport', w:3, tone:-1, imp:-0.070, cat:'company', mag:true,
    h_en:c=>`Short-seller report targeted ${c.name}`,
    h_tr:c=>`Açığa satış raporu ${c.name}'ı hedef aldı`,
    fx:{ sentiment:-11, risk:9, management:-4 } },
  { id:'award', w:5, tone:1, imp:0.015, cat:'company', mag:false,
    h_en:c=>`${c.name} won an innovation award`,
    h_tr:c=>`${c.name} inovasyon ödülü kazandı`,
    fx:{ brandStrength:1.8, innovation:0.9 } },
  { id:'strike', w:4, tone:-1, imp:-0.026, cat:'company', mag:false,
    h_en:c=>`Strike began at ${c.name}'s operations`,
    h_tr:c=>`${c.name} operasyonlarında grev başladı`,
    fx:{ profitMargin:-0.7, sentiment:-3.5 } },
  { id:'merger', w:4, tone:1, imp:0.045, cat:'company', mag:true,
    h_en:c=>`${c.name} in merger talks with sector giant`,
    h_tr:c=>`${c.name} sektör deviyle birleşme görüşmelerinde`,
    fx:{ sentiment:6, brandStrength:2.5, growth:1.2 } },
  { id:'takeover', w:3, tone:1, imp:0.055, cat:'company', mag:true,
    h_en:c=>`Takeover offer received for ${c.name}`,
    h_tr:c=>`${c.name} için satın alma teklifi geldi`,
    fx:{ sentiment:8, growth:1.5 } },
  { id:'insidertrade', w:3, tone:-1, imp:-0.038, cat:'company', mag:false,
    h_en:c=>`Insider trading probe at ${c.name}`,
    h_tr:c=>`${c.name} yöneticilerine içeriden işlem soruşturması`,
    fx:{ sentiment:-5.5, management:-4, risk:5 } },
  { id:'analystinit', w:6, tone:1, imp:0.014, cat:'company', mag:false,
    h_en:c=>`Brokerage initiated ${c.name} with "Buy" rating`,
    h_tr:c=>`Büyük aracı kurum ${c.name} için "Al" tavsiyesi başlattı`,
    fx:{ sentiment:2.0 } },
  { id:'ratingcut', w:6, tone:-1, imp:-0.016, cat:'company', mag:false,
    h_en:c=>`${c.name} credit rating downgraded`,
    h_tr:c=>`${c.name} kredi notu bir kademe düşürüldü`,
    fx:{ sentiment:-3.0, risk:2.5 } },
  { id:'esg', w:4, tone:1, imp:0.012, cat:'company', mag:false,
    h_en:c=>`${c.name} added to sustainability index`,
    h_tr:c=>`${c.name} sürdürülebilirlik endeksine girdi`,
    fx:{ brandStrength:1.5, sentiment:1.2 } },
  { id:'productfail', w:4, tone:-1, imp:-0.030, cat:'company', mag:false,
    h_en:c=>`${c.name}'s new product missed expectations`,
    h_tr:c=>`${c.name} yeni ürünü beklentileri karşılayamadı`,
    fx:{ sentiment:-4.5, innovation:-1.5 } },
  { id:'viral', w:4, tone:1, imp:0.026, cat:'company', mag:false,
    h_en:c=>`${c.name}'s product went viral on social media`,
    h_tr:c=>`${c.name} ürünü sosyal medyada viral oldu`,
    fx:{ brandStrength:3.0, customers:0.03, sentiment:3 } },
  { id:'capacity', w:5, tone:1, imp:0.020, cat:'company', mag:false,
    h_en:c=>`${c.name} expanding production capacity`,
    h_tr:c=>`${c.name} üretim kapasitesini genişletiyor`,
    fx:{ growth:0.9, employees:0.02 } },
  { id:'cxochange', w:4, tone:0, imp:-0.006, cat:'company', mag:false,
    h_en:c=>`${c.name} appointed a new CFO`,
    h_tr:c=>`${c.name} yeni finans direktörünü atadı`,
    fx:{ management:0.8 } },
  { id:'greenbond', w:4, tone:1, imp:0.016, cat:'company', mag:false,
    h_en:c=>`${c.name} issued a green bond`,
    h_tr:c=>`${c.name} yeşil tahvil ihraç etti`,
    fx:{ brandStrength:1.4, sentiment:1.5 } },
  { id:'sued', w:5, tone:-1, imp:-0.024, cat:'company', mag:false,
    h_en:c=>`${c.name} faces a class-action lawsuit`,
    h_tr:c=>`${c.name} toplu davayla karşı karşıya`,
    fx:{ sentiment:-4.0, risk:3.0 } },
];
const TOPLAM_HABER_W = HABER_SABLONLARI.reduce((a,b)=>a+b.w,0);

function pickNewsTemplate(){
  let r = rnd()*TOPLAM_HABER_W;
  for(const t of HABER_SABLONLARI){ r -= t.w; if(r<=0) return t; }
  return HABER_SABLONLARI[0];
}

function addCompanyNews(c, tmplId, headline, toneOverride){
  const tmpl = (tmplId === 'earnings' || tmplId === 'distress' || tmplId === 'custom') ? null : HABER_SABLONLARI.find(t=>t.id===tmplId);
  const tone = toneOverride !== undefined ? toneOverride : (tmpl? tmpl.tone : 0);
  const imp = tmpl ? tmpl.imp : 0;
  const isMajor = tmpl ? !!tmpl.mag : false;
  if(tmpl && tmpl.fx){
    const fx = tmpl.fx;
    if(fx.innovation) c.innovation = clamp(c.innovation + fx.innovation, 3, 97);
    if(fx.management) c.management = clamp(c.management + fx.management, 3, 97);
    if(fx.brandStrength) c.brandStrength = clamp(c.brandStrength + fx.brandStrength, 3, 97);
    if(fx.risk) c.risk = clamp(c.risk + fx.risk, 2, 96);
    if(fx.sentiment) c.sentiment = clamp(c.sentiment + fx.sentiment, 2, 96);
    if(fx.growth) c.growth = clamp(c.growth + fx.growth, -12, 34);
    if(fx.profitMargin) c.profitMargin = clamp(c.profitMargin + fx.profitMargin, -40, 50);
    if(fx.customers) c.customers = Math.max(100, Math.round(c.customers * (1 + fx.customers)));
    if(fx.employees) c.employees = Math.max(50, Math.round(c.employees * (1 + fx.employees)));
  }
  c.newsImpact = clamp(c.newsImpact + imp, -0.28, 0.28);
  const cat = tmpl ? (tmpl.cat || 'company') : (tmplId === 'earnings' ? 'earnings' : tmplId === 'distress' ? 'crisis' : 'company');
  const item = { d: state.cycle, headline, tone, companyId: c.id, ticker: c.ticker, sector: c.sector, cat, major: isMajor, flag: c.flag };
  c.newsLog.push({ d: state.cycle, headline, tone });
  if(c.newsLog.length > 100) c.newsLog.shift();
  state.news.unshift(item);
  if(state.news.length > CONFIG.MAX_HABER) state.news.pop();
  notifyNews(item);
  return item;
}

function addMacroNews(tag, headline, impact, companyId, major){
  const catMap = { cycle:'macro', rate:'macro', inflation:'macro', jobs:'macro', gdp:'macro',
    energy:'macro', geo:'crisis', crisis:'crisis', sector:'sector', policy:'policy', rally:'macro' };
  const cat = catMap[tag] || 'macro';
  const item = { d: state.cycle, headline, tone: impact>0?1:(impact<0?-1:0), tag, cat, companyId: companyId||null, ticker: null, sector: null, major: !!major };
  state.news.unshift(item);
  if(state.news.length > CONFIG.MAX_HABER) state.news.pop();
  if(impact){
    for(const c of state.companies){
      if(!c.alive) continue;
      const sec = SEKTORLER[c.sector];
      let mult = 1;
      if(tag === 'rate') mult = 1 + sec.faiz*0.6;
      else if(tag === 'energy') mult = 1 + sec.enerji*0.6;
      else if(tag === 'inflation') mult = 1 + sec.enf*0.6;
      else if(tag === 'gdp') mult = 1 + sec.gsyh*0.6;
      else if(tag === 'policy') mult = 1 + (sec.faiz + sec.enf)*0.3;
      if(companyId && c.id !== companyId) continue;
      c.newsImpact = clamp(c.newsImpact + impact*0.012*mult, -0.28, 0.28);
    }
  }
  notifyNews(item);
  return item;
}

let lastNewsToastAt = 0;
function notifyNews(item){
  state.unreadNews = (state.unreadNews || 0) + 1;
  updateNewsBadge();
  showNewsAlert(item);
  const now = Date.now();
  if(item.major || now - lastNewsToastAt > 8000){
    lastNewsToastAt = now;
    toast((item.major?'⭐ ':'📰 ') + item.headline.slice(0, 70), item.major?'warn':'gold');
  }
}

let newsAlertTimer = null;
function showNewsAlert(item){
  const el = document.getElementById('newsAlert');
  if(!el) return;
  const toneCls = item.major ? 'major' : (item.tone > 0 ? 'pos' : (item.tone < 0 ? 'neg' : ''));
  el.className = toneCls;
  const { icon } = catInfo(item.cat);
  el.innerHTML = `
    <div class="na-head">
      <span>${item.major?t('newsAlert.major'):t('newsAlert.new')}</span>
      <span class="x" data-close>✕</span>
    </div>
    <div class="na-body">${icon} ${esc(item.headline)}</div>
    <div class="na-meta">${item.ticker ? (item.flag?item.flag+' ':'') + esc(item.ticker) + ' · ' : ''}${fmtTime(item.d)}</div>
  `;
  el.classList.remove('hidden');
  el.onclick = (e)=>{
    if(e.target.dataset.close !== undefined){ el.classList.add('hidden'); return; }
    el.classList.add('hidden');
    if(item.companyId) openCompany(item.companyId);
    else { state.ui.view = 'news'; setView('news'); }
  };
  clearTimeout(newsAlertTimer);
  newsAlertTimer = setTimeout(() => el.classList.add('hidden'), 6000);
}

function updateNewsBadge(){
  const el = document.getElementById('newsBadge');
  if(!el) return;
  const n = state.unreadNews || 0;
  if(n > 0){ el.textContent = n > 99 ? '99+' : n; el.classList.remove('hidden'); }
  else el.classList.add('hidden');
}

function generateNews(){
  const canlilar = aliveCompanies();
  for(const c of canlilar){
    const sec = state.sectors[c.sector];
    let p = CONFIG.HABER_OLASILIK * (0.7 + c.volatility*10);
    p *= (0.6 + (50 - Math.abs(sec.duygu-50))/50 * 0.6);
    if(rnd() < p){
      const tmpl = pickNewsTemplate();
      const headline = LANG === 'tr' ? tmpl.h_tr(c) : tmpl.h_en(c);
      addCompanyNews(c, tmpl.id, headline);
    }
  }
  if(rnd() < 0.09){
    const s = pickR(SEKTOR_ADLARI);
    const headlines = LANG === 'tr' ? [
      `${s} sektöründe talep değişimi`,
      `${s} sektöründe maliyet baskısı artıyor`,
      `${s} sektörüne yatırımcı ilgisi yükseliyor`,
      `${s} sektöründe yeni düzenleme gündemde`,
      `${s} sektörü ihracat rekoru kırdı`,
      `${s} sektöründe birleşme dalgası başladı`
    ] : [
      `Demand shift observed in ${s} sector`,
      `Cost pressure rising in ${s} sector`,
      `Investor interest surging in ${s} sector`,
      `New regulation on the agenda for ${s} sector`,
      `${s} sector set export record`,
      `M&A wave begins in ${s} sector`
    ];
    const tone = rnd()<0.5?1:-1;
    addMacroNews('sector', pickR(headlines), tone*0.35);
  }
}

function decayNews(){
  for(const c of state.companies){
    c.newsImpact *= 0.80;
    if(Math.abs(c.newsImpact) < 0.00005) c.newsImpact = 0;
  }
}

/* =========================== NPC ENGINE =========================== */
function initNPCs(){
  state.npcs = [];
  const agirlik = ['Değer Yatırımcısı','Büyüme Yatırımcısı','Trader','Trader','Trader','Uzun Vadeli Yatırımcı','Panik Yatırımcısı','Spekülatör','Değer Yatırımcısı','Büyüme Yatırımcısı','Uzun Vadeli Yatırımcı','Spekülatör','Değer Yatırımcısı','Büyüme Yatırımcısı'];
  for(let i=0;i<CONFIG.NPC_SAYISI;i++){
    const type = pickR(agirlik);
    state.npcs.push({
      id: i, type,
      cash: rrange(3e6, 180e6),
      holdings: {},
      risk: type==='Spekülatör'?rrange(0.7,1.0):type==='Panik Yatırımcısı'?rrange(0.2,0.5):type==='Uzun Vadeli Yatırımcı'?rrange(0.25,0.55):rrange(0.35,0.8)
    });
  }
}

function npcScore(npc, c){
  const sec = SEKTORLER[c.sector];
  const sekDuygu = state.sectors[c.sector].duygu;
  const e = state.economy;
  const eps = c.eps;
  const pe = eps > 0.01 ? c.price/eps : 999;
  const sektorPE = sec.peTab;
  let score = 0;
  switch(npc.type){
    case 'Değer Yatırımcısı':
      if(eps > 0.01) score += clamp((sektorPE - pe)/sektorPE, -1.2, 1.2) * 1.1;
      score += clamp((c.cash/Math.max(c.revenue,1) - 0.12)*1.3, -0.7, 0.7);
      score -= clamp((c.debt/Math.max(c.revenue,1) - 0.5)*0.9, -0.6, 1.0);
      score += (c.dividendYield/6)*0.35;
      score -= (c.risk-50)/160;
      break;
    case 'Büyüme Yatırımcısı':
      score += clamp(c.growth/20, -1, 1.4);
      score += (c.innovation-50)/70;
      score += clamp(c.momentum*8, -0.6, 0.6);
      break;
    case 'Trader':
      score += clamp(c.momentum*26, -1.3, 1.3);
      score += (sekDuygu-50)/90;
      score += clamp(c.newsImpact*10, -1.0, 1.0);
      break;
    case 'Uzun Vadeli Yatırımcı':
      score += (c.dividendYield/6)*0.5;
      score += (c.management-50)/110;
      score -= (c.risk-50)/200;
      score += 0.08;
      break;
    case 'Panik Yatırımcısı':
      score -= (e.piyasaKorkusu-50)/55;
      score -= clamp(c.momentum*18, -1.1, 1.1);
      score -= clamp(c.newsImpact*12, -1.1, 1.1);
      if(e.duygu < 35) score -= 0.6;
      break;
    case 'Spekülatör':
      score += clamp(c.volatility*24, 0, 1.0);
      score += clamp(c.newsImpact*18, -1.4, 1.4);
      score += clamp(c.momentum*30, -1.1, 1.1);
      score -= 0.12;
      break;
  }
  return score;
}

function runNPCs(){
  for(const c of state.companies) c.npcDemand = 0;
  const canlilar = aliveCompanies();
  if(canlilar.length === 0) return;
  for(const npc of state.npcs){
    if(rnd() > 0.68) continue;
    const c = pickR(canlilar);
    const score = npcScore(npc, c);
    if(score > 0.22 && npc.cash > c.price * 20){
      const butce = npc.cash * rrange(0.05, 0.28) * (0.5 + npc.risk);
      let qty = Math.floor(butce / c.price);
      if(qty > 0 && qty*c.price <= npc.cash){
        npc.cash -= qty*c.price;
        npc.holdings[c.id] = (npc.holdings[c.id]||0) + qty;
        c.npcDemand += qty;
      }
    } else if(score < -0.22){
      const held = npc.holdings[c.id] || 0;
      if(held > 0){
        const qty = Math.max(1, Math.floor(held * rrange(0.20, 0.75)));
        npc.holdings[c.id] = held - qty;
        if(npc.holdings[c.id] <= 0) delete npc.holdings[c.id];
        npc.cash += qty * c.price;
        c.npcDemand -= qty;
      }
    }
  }
}

/* ==================== PRICE ENGINE =============================== */
function fairValue(c){
  const sec = SEKTORLER[c.sector];
  const e = state.economy;
  const sekDuygu = state.sectors[c.sector].duygu;
  if(c.eps <= 0.012){
    const sps = c.revenue / c.shares;
    const psMult = clamp(1.5 * (1 + c.growth/45) * (0.75 + e.duygu/140), 0.4, 5.5);
    return Math.max(0.3, sps * psMult);
  }
  let pe = sec.peTab;
  pe *= (1 + clamp(c.growth, -15, 30)/100 * 1.4);
  pe *= (1 - (c.risk - 50)/100 * 0.30);
  pe *= (1 - (e.faiz - 3.0) * 0.040);
  pe *= (0.78 + (e.duygu/100) * 0.48);
  pe *= (1 + (sekDuygu - 50)/500);
  pe *= (1 + (c.management-50)/750);
  pe = clamp(pe, 4, 80);
  return Math.max(0.4, c.eps * pe);
}

function microTickPrice(){
  const e = state.economy;
  for(const c of state.companies){
    if(!c.alive) continue;
    const sec = SEKTORLER[c.sector];
    const fair = fairValue(c);
    const gap = (fair - c.price) / c.price;
    const reversion = clamp(gap, -1.2, 1.2) * 0.010 / CONFIG.CYCLE_TICKS;
    const mom = clamp(c.momentum, -0.18, 0.18) * 0.10 / CONFIG.CYCLE_TICKS;
    const macro = ((e.faiz - 3.0) * sec.faiz * 0.0026
      + ((e.enerjiFiyati - 82)/82) * sec.enerji * 0.0065
      + (e.enflasyon - 2.4) * sec.enf * 0.0020
      + (e.gsyhBuyume - 2.0) * sec.gsyh * 0.0026
      + ((e.tuketiciGuveni - 100)/10) * sec.tuketim * 0.00080
      - (e.regulationLevel - 50) * 0.00004) / CONFIG.CYCLE_TICKS;
    const sektorEtkisi = state.sectors[c.sector].momentum * 0.40 / CONFIG.CYCLE_TICKS;
    const duyguEtkisi = ((e.duygu - 50)/100) * 0.0065 * c.beta / CONFIG.CYCLE_TICKS;
    const haberEtkisi = c.newsImpact / CONFIG.CYCLE_TICKS;
    const akis = clamp(c.npcDemand / (c.avgVolume + 1) * 0.32, -0.028, 0.028);
    const vol = c.volatility * (0.7 + e.piyasaKorkusu/200) * 0.28;
    const gurultu = gaussR() * vol;
    let change = reversion + mom + macro + sektorEtkisi + duyguEtkisi + haberEtkisi + akis + gurultu;
    if(rnd() < 0.016){
      const dir = rnd() < 0.5 ? 1 : -1;
      change += dir * Math.abs(gaussR()) * 0.028;
    }
    change = clamp(change, -0.055, 0.055);
    if(!isFinite(change)) change = 0;
    const newPrice = Math.max(0.3, c.price * (1 + change));
    c.price = round2(newPrice);
    c.changePct = ((c.price - c.prevClose)/c.prevClose) * 100;
    if(c.price > c.high) c.high = c.price;
    if(c.price < c.low) c.low = c.price;
  }
}

function cycleCommitPrices(){
  for(const c of state.companies){
    if(!c.alive) continue;
    c.close = round2(c.price);
    c.marketCap = c.price * c.shares;
    const volume = Math.round(c.avgVolume * rrange(0.45, 1.85) * (1 + Math.abs(c.momentum||0)*9) * (1 + state.economy.piyasaKorkusu/180));
    c.volume = Math.max(0, volume);
    c.avgVolume = Math.round(c.avgVolume * 0.97 + c.volume * 0.03);
    c.priceHistory.push({ d: state.cycle, o: c.open, h: c.high, l: c.low, c: c.close, v: c.volume });
    if(c.priceHistory.length > CONFIG.MAX_FIYAT_GECMISI) c.priceHistory.shift();
    c.prevClose = c.close;
    c.open = round2(c.close * (1 + gaussR() * c.volatility * 0.15));
    c.high = Math.max(c.open, c.close);
    c.low = Math.min(c.open, c.close);
    c.momentum = 0;
  }
  let totalCap = 0, weightedChange = 0;
  for(const c of state.companies){
    if(!c.alive) continue;
    totalCap += c.marketCap;
    weightedChange += (c.changePct||0) * c.marketCap;
  }
  if(totalCap > 0){
    const idxChange = weightedChange / totalCap / 100;
    const last = state.market.indexHistory[state.market.indexHistory.length-1];
    const newIdx = Math.max(1, last.value * (1 + idxChange));
    state.market.indexHistory.push({ d: state.cycle, value: round2(newIdx) });
    if(state.market.indexHistory.length > 2000) state.market.indexHistory.shift();
    state.market.index = round2(newIdx);
    const arr = state.market.indexHistory;
    let ma50 = newIdx;
    if(arr.length >= 50){
      let s = 0;
      for(let i=arr.length-50;i<arr.length;i++) s += arr[i].value;
      ma50 = s/50;
    }
    if(newIdx > ma50 * 1.030) state.market.regime = 'bull';
    else if(newIdx < ma50 * 0.970) state.market.regime = 'bear';
    else state.market.regime = 'side';
  }
}

/* =============== QUARTERLY EARNINGS / DIVIDEND ==================== */
function processQuarters(){
  const canlilar = aliveCompanies();
  for(const c of canlilar){
    if(state.cycle >= c.nextEarnings){
      c.nextEarnings += 63;
      const qKar = c.profit / 4;
      c.qProfits.push(qKar);
      if(c.qProfits.length > 9) c.qProfits.shift();
      let yillik = null;
      if(c.qProfits.length >= 5){
        const eski = c.qProfits[0];
        if(Math.abs(eski) > 500000) yillik = ((qKar - eski)/Math.abs(eski)) * 100;
      }
      const beklenen = c.expectedGrowth;
      const gercek = (yillik === null || !isFinite(yillik)) ? beklenen : clamp(yillik, -95, 200);
      const surpriz = gercek - beklenen;
      c.expectedGrowth = clamp(beklenen * 0.55 + gercek * 0.45, -25, 55);
      let etki = clamp(surpriz/100 * 0.35, -0.12, 0.12);
      const tone = surpriz > 1.5 ? 1 : (surpriz < -1.5 ? -1 : 0);
      let ifade, headline;
      if(LANG === 'tr'){
        ifade = surpriz > 6 ? 'beklentileri büyük ölçüde aştı' :
                surpriz > 1.5 ? 'beklentileri aştı' :
                surpriz < -6 ? 'beklentilerin çok altında kaldı' :
                surpriz < -1.5 ? 'beklentilerin altında kaldı' : 'beklentilerle uyumlu';
        headline = c.name + ' bilançosu: kâr artışı %' + gercek.toFixed(1) + ' — ' + ifade;
      } else {
        ifade = surpriz > 6 ? 'far exceeded expectations' :
                surpriz > 1.5 ? 'beat expectations' :
                surpriz < -6 ? 'fell far short of expectations' :
                surpriz < -1.5 ? 'missed expectations' : 'in line with expectations';
        headline = c.name + ' earnings: profit growth ' + gercek.toFixed(1) + '% — ' + ifade;
      }
      c.newsImpact = clamp(c.newsImpact + etki, -0.28, 0.28);
      const item = { d: state.cycle, headline, tone, companyId: c.id, ticker: c.ticker, sector: c.sector, cat:'earnings', major: Math.abs(surpriz) > 6, flag: c.flag };
      c.newsLog.push({ d: state.cycle, headline, tone });
      if(c.newsLog.length > 100) c.newsLog.shift();
      state.news.unshift(item);
      if(state.news.length > CONFIG.MAX_HABER) state.news.pop();
      notifyNews(item);
      c.sentiment = clamp(c.sentiment + clamp(surpriz*0.35, -8, 8), 2, 96);
    }
    if(state.cycle >= c.nextDividend){
      c.nextDividend += 63;
      if(c.dividendYield > 0.05 && c.profit > 0){
        const hisseBasi = c.price * (c.dividendYield/100) / 4;
        const toplam = hisseBasi * c.shares;
        if(c.cash > toplam * 1.6){
          c.cash -= toplam;
          const pos = state.player.positions[c.id];
          if(pos && pos.shares > 0){
            const odeme = hisseBasi * pos.shares;
            state.player.cash += odeme;
            state.player.stats.temettuler += odeme;
            toast(t('common.dividendRecv', {v:fmtCash(odeme), t:c.ticker}), 'ok');
          }
          const hl = c.name + (LANG === 'tr' ? ' çeyreklik kâr payı ödedi' : ' paid a quarterly dividend');
          c.newsLog.push({ d: state.cycle, headline: hl, tone: 1 });
          const item = { d: state.cycle, headline: hl, tone: 1, companyId: c.id, ticker: c.ticker, sector: c.sector, cat:'dividend', flag: c.flag };
          state.news.unshift(item);
          if(state.news.length > CONFIG.MAX_HABER) state.news.pop();
          notifyNews(item);
        } else if(rnd() < 0.5){
          c.dividendYield = Math.max(0, c.dividendYield * 0.5);
          const hl = c.name + (LANG === 'tr' ? ' kâr payını azalttı' : ' reduced its dividend');
          addCompanyNews(c, 'custom', hl, -1);
        }
      }
      if(c.profit > 0 && c.cash > c.revenue*0.15){
        c.dividendYield = clamp(c.dividendYield + rrange(-0.04, 0.06), 0, 7);
      } else if(c.profit < 0){
        c.dividendYield = Math.max(0, c.dividendYield - 0.10);
      }
    }
  }
}

/* ================== PORTFOLIO / TRADING ========================== */
function holdingsValue(){
  let v = 0;
  for(const id in state.player.positions){
    const pos = state.player.positions[id];
    if(!pos || pos.shares <= 0) continue;
    const c = getCompany(Number(id));
    if(!c || !c.alive) continue;
    v += pos.shares * c.price;
  }
  return v;
}
function totalWealth(){ return state.player.cash + holdingsValue(); }

function buyShares(companyId, qty){
  const c = getCompany(companyId);
  if(!c || !c.alive){ toast(t('common.notTraded'), 'err'); return false; }
  qty = Math.floor(qty);
  if(!qty || qty <= 0){ toast(t('common.invalidQty'), 'err'); return false; }
  const cost = qty * c.price;
  const fee = cost * getCommission();
  const total = cost + fee;
  if(total > state.player.cash + 1e-6){ toast(t('common.insufficient'), 'err'); return false; }
  state.player.cash -= total;
  const pos = state.player.positions[c.id] || { shares: 0, cost: 0 };
  pos.shares += qty;
  pos.cost += total;
  state.player.positions[c.id] = pos;
  state.player.stats.islemSayisi++;
  c.npcDemand += qty;
  toast(t('common.bought', {n:qty.toLocaleString('en-US'), t:c.ticker, p:fmtMoney(c.price)}), 'ok');
  return true;
}

function sellShares(companyId, qty){
  const c = getCompany(companyId);
  if(!c){ toast(t('common.notFound'), 'err'); return false; }
  qty = Math.floor(qty);
  const pos = state.player.positions[companyId];
  if(!pos || pos.shares <= 0){ toast(t('common.notOwned'), 'err'); return false; }
  if(!qty || qty <= 0){ toast(t('common.invalidQty'), 'err'); return false; }
  if(qty > pos.shares){ toast(t('common.onlyOwn', {n:pos.shares.toLocaleString('en-US')}), 'err'); return false; }
  const price = c.alive ? c.price : 0;
  const gelir = qty * price;
  const fee = gelir * getCommission();
  state.player.cash += gelir - fee;
  const ort = pos.cost / pos.shares;
  const realiz = (price - ort) * qty - fee;
  state.player.stats.realized += realiz;
  if(state.player.stats.enIyiIslem === null || realiz > state.player.stats.enIyiIslem) state.player.stats.enIyiIslem = realiz;
  if(state.player.stats.enKotuIslem === null || realiz < state.player.stats.enKotuIslem) state.player.stats.enKotuIslem = realiz;
  pos.cost -= ort * qty;
  pos.shares -= qty;
  if(pos.shares <= 0) delete state.player.positions[companyId];
  state.player.stats.islemSayisi++;
  c.npcDemand -= qty;
  toast(t('common.sold', {n:qty.toLocaleString('en-US'), t:c.ticker, p:fmtMoney(price)}), realiz >= 0 ? 'ok' : 'warn');
  return true;
}

function updatePortfolioHistory(){
  const v = totalWealth();
  state.player.portfolioHistory.push({ d: state.cycle, value: v });
  if(state.player.portfolioHistory.length > 2000) state.player.portfolioHistory.shift();
  if(v > state.player.stats.enYuksekDeger) state.player.stats.enYuksekDeger = v;
  const zirve = state.player.stats.enYuksekDeger;
  if(zirve > 0){
    const dd = (zirve - v)/zirve;
    if(dd > state.player.stats.maxDusus) state.player.stats.maxDusus = dd;
  }
}

/* ================== TECHNICAL =============================== */
function smaSeries(arr, p){
  const out = new Array(arr.length).fill(null);
  let sum = 0;
  for(let i=0;i<arr.length;i++){
    sum += arr[i];
    if(i >= p) sum -= arr[i-p];
    if(i >= p-1) out[i] = sum/p;
  }
  return out;
}

/* ===================== CHART DRAWING ============================== */
function setupCanvas(cv){
  const dpr = window.devicePixelRatio || 1;
  const rect = cv.getBoundingClientRect();
  const w = Math.max(40, Math.floor(rect.width));
  const h = Math.max(30, Math.floor(rect.height));
  cv.width = Math.floor(w*dpr);
  cv.height = Math.floor(h*dpr);
  const ctx = cv.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  return { ctx, w, h };
}
const COL = { up:'#22c55e', down:'#ef4444', grid:'rgba(38,52,74,.55)', axis:'#7a8aa2', ma20:'#f59e0b' };
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

function drawCandles(cv, candles, opts){
  opts = opts || {};
  const { ctx, w, h } = setupCanvas(cv);
  ctx.clearRect(0,0,w,h);
  if(!candles || candles.length === 0){
    ctx.fillStyle = '#42506a'; ctx.font = '11px '+MONO; ctx.textAlign='center';
    ctx.fillText(t('empty.noData'), w/2, h/2); return;
  }
  const padL = 10, padR = 74, padT = 14, padB = 12;
  const cw = w - padL - padR, ch = h - padT - padB;
  let min = Infinity, max = -Infinity;
  for(const d of candles){ if(d.l < min) min = d.l; if(d.h > max) max = d.h; }
  if(opts.ma){
    for(const m of opts.ma){
      if(!m.data) continue;
      for(const v of m.data){ if(v==null) continue; if(v<min) min=v; if(v>max) max=v; }
    }
  }
  if(!isFinite(min) || !isFinite(max)){ min = 0; max = 1; }
  const pad = (max-min)*0.08 || Math.max(0.5, max*0.05);
  min -= pad; max += pad;
  const rng = (max-min) || 1;
  const X = i => padL + (i+0.5)*(cw/candles.length);
  const Y = v => padT + (1-(v-min)/rng)*ch;

  const bgGrad = ctx.createLinearGradient(0, padT, 0, padT+ch);
  bgGrad.addColorStop(0, 'rgba(30,45,68,0.18)');
  bgGrad.addColorStop(1, 'rgba(10,15,22,0)');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(padL, padT, cw, ch);

  ctx.setLineDash([4,4]);
  ctx.lineWidth = 1;
  ctx.font = '10px '+MONO;
  ctx.textAlign = 'left';
  const steps = 5;
  for(let i=0;i<=steps;i++){
    const y = padT + (ch/steps)*i;
    ctx.strokeStyle = COL.grid;
    ctx.beginPath(); ctx.moveTo(padL, y+.5); ctx.lineTo(padL+cw, y+.5); ctx.stroke();
    const val = max - (rng/steps)*i;
    const label = val >= 100 ? val.toFixed(0) : val.toFixed(2);
    const tw = ctx.measureText(label).width;
    ctx.fillStyle = '#0a0f16';
    ctx.fillRect(padL+cw+3, y-6, tw+8, 13);
    ctx.fillStyle = COL.axis;
    ctx.fillText(label, padL+cw+7, y+3.5);
  }
  ctx.setLineDash([]);

  const bw = Math.max(2, Math.min(20, cw/candles.length*0.7));
  for(let i=0;i<candles.length;i++){
    const d = candles[i];
    const up = d.c >= d.o;
    const col = up ? COL.up : COL.down;
    const x = X(i);
    ctx.strokeStyle = col;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(Math.round(x)+.5, Y(d.h));
    ctx.lineTo(Math.round(x)+.5, Y(d.l));
    ctx.stroke();
    const yo = Y(d.o), yc = Y(d.c);
    const top = Math.min(yo,yc);
    const hgt = Math.max(1.5, Math.abs(yc-yo));
    ctx.fillStyle = col;
    ctx.fillRect(x-bw/2, top, bw, hgt);
  }

  if(opts.ma){
    for(const m of opts.ma){
      if(!m.data) continue;
      ctx.strokeStyle = m.color + '40';
      ctx.lineWidth = 4;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      let started = false;
      for(let i=0;i<m.data.length;i++){
        const v = m.data[i];
        if(v == null){ started = false; continue; }
        const x = X(i), y = Y(v);
        if(!started){ ctx.moveTo(x,y); started = true; } else ctx.lineTo(x,y);
      }
      ctx.stroke();
      ctx.strokeStyle = m.color;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      started = false;
      for(let i=0;i<m.data.length;i++){
        const v = m.data[i];
        if(v == null){ started = false; continue; }
        const x = X(i), y = Y(v);
        if(!started){ ctx.moveTo(x,y); started = true; } else ctx.lineTo(x,y);
      }
      ctx.stroke();
    }
  }

  if(opts.markers && opts.markers.length){
    for(const m of opts.markers){
      if(m.i < 0 || m.i >= candles.length) continue;
      const x = X(m.i);
      ctx.beginPath();
      ctx.arc(x, padT+6, m.major ? 5 : 3.5, 0, Math.PI*2);
      ctx.fillStyle = m.tone > 0 ? '#22c55e' : (m.tone < 0 ? '#ef4444' : '#f59e0b');
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.7)'; ctx.lineWidth = 1.2; ctx.stroke();
    }
  }
  cv._meta = { padL, cw, n: candles.length, candles, min, max, X, Y };
}

function drawVolume(cv, candles){
  const { ctx, w, h } = setupCanvas(cv);
  ctx.clearRect(0,0,w,h);
  if(!candles || !candles.length) return;
  const padL = 10, padR = 74, padT = 4, padB = 4;
  const cw = w-padL-padR, ch = h-padT-padB;
  let maxV = 0;
  for(const d of candles) if(d.v > maxV) maxV = d.v;
  if(maxV <= 0) maxV = 1;
  const bw = Math.max(2, Math.min(20, cw/candles.length*0.7));
  for(let i=0;i<candles.length;i++){
    const d = candles[i];
    const up = d.c >= d.o;
    const x = padL + (i+0.5)*(cw/candles.length);
    const bh = (d.v/maxV)*ch;
    const grad = ctx.createLinearGradient(0, padT+ch-bh, 0, padT+ch);
    if(up){ grad.addColorStop(0,'rgba(34,197,94,.55)'); grad.addColorStop(1,'rgba(34,197,94,.15)'); }
    else  { grad.addColorStop(0,'rgba(239,68,68,.55)'); grad.addColorStop(1,'rgba(239,68,68,.15)'); }
    ctx.fillStyle = grad;
    ctx.fillRect(x-bw/2, padT+ch-bh, bw, bh);
  }
  ctx.fillStyle = COL.axis; ctx.font='10px '+MONO; ctx.textAlign='left';
  ctx.fillText((LANG==='tr'?'Hacim: ':'Vol: ')+fmtBig(maxV,1), padL+cw+7, padT+10);
}

function drawLineChart(cv, points, opts){
  opts = opts || {};
  const { ctx, w, h } = setupCanvas(cv);
  ctx.clearRect(0,0,w,h);
  if(!points || points.length < 2){
    ctx.fillStyle = '#42506a'; ctx.font = '11px '+MONO; ctx.textAlign='center';
    ctx.fillText(opts.emptyText || t('empty.notEnough'), w/2, h/2);
    return;
  }
  const padL = 10, padR = 74, padT = 14, padB = 18;
  const cw = w-padL-padR, ch = h-padT-padB;
  let min = Infinity, max = -Infinity;
  for(const p of points){ if(p.y < min) min = p.y; if(p.y > max) max = p.y; }
  if(min === max){ min -= 1; max += 1; }
  const pad = (max-min)*0.09;
  min -= pad; max += pad;
  const rng = max-min;
  const X = i => padL + (i/(points.length-1))*cw;
  const Y = v => padT + (1-(v-min)/rng)*ch;

  ctx.setLineDash([4,4]);
  ctx.lineWidth = 1;
  ctx.font = '10px '+MONO; ctx.textAlign = 'left';
  for(let i=0;i<=4;i++){
    const y = padT + (ch/4)*i;
    ctx.strokeStyle = COL.grid;
    ctx.beginPath(); ctx.moveTo(padL, y+.5); ctx.lineTo(padL+cw, y+.5); ctx.stroke();
    const val = max - (rng/4)*i;
    const lbl = opts.fmt ? opts.fmt(val) : fmtBig(val,1);
    const tw = ctx.measureText(lbl).width;
    ctx.fillStyle = '#0a0f16';
    ctx.fillRect(padL+cw+3, y-6, tw+8, 13);
    ctx.fillStyle = COL.axis;
    ctx.fillText(lbl, padL+cw+7, y+3.5);
  }
  ctx.setLineDash([]);

  const color = opts.color || '#3b82f6';
  const grad = ctx.createLinearGradient(0, padT, 0, padT+ch);
  grad.addColorStop(0, color + '66');
  grad.addColorStop(0.5, color + '20');
  grad.addColorStop(1, color + '02');
  ctx.beginPath();
  ctx.moveTo(X(0), Y(points[0].y));
  for(let i=1;i<points.length;i++) ctx.lineTo(X(i), Y(points[i].y));
  ctx.lineTo(X(points.length-1), padT+ch);
  ctx.lineTo(X(0), padT+ch);
  ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  ctx.strokeStyle = color + '40';
  ctx.lineWidth = 4.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(X(0), Y(points[0].y));
  for(let i=1;i<points.length;i++) ctx.lineTo(X(i), Y(points[i].y));
  ctx.stroke();

  ctx.strokeStyle = color; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(X(0), Y(points[0].y));
  for(let i=1;i<points.length;i++) ctx.lineTo(X(i), Y(points[i].y));
  ctx.stroke();

  const lastX = X(points.length-1), lastY = Y(points[points.length-1].y);
  ctx.beginPath();
  ctx.arc(lastX, lastY, 4, 0, Math.PI*2);
  ctx.fillStyle = color; ctx.fill();
  ctx.strokeStyle = '#0a0f16'; ctx.lineWidth = 2; ctx.stroke();

  if(opts.baseline !== undefined){
    const by = Y(opts.baseline);
    ctx.strokeStyle = 'rgba(122,138,162,.35)';
    ctx.setLineDash([5,5]); ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, by+.5); ctx.lineTo(padL+cw, by+.5); ctx.stroke();
    ctx.setLineDash([]);
  }

  cv._lineMeta = { padL, cw, ch, padT, points, X, Y, opts };
}

function drawDonut(cv, items){
  const { ctx, w, h } = setupCanvas(cv);
  ctx.clearRect(0,0,w,h);
  const cx = w/2, cy = h/2;
  const R = Math.min(w,h)/2 - 6;
  const r = R*0.58;
  if(R <= 10) return;
  const total = items.reduce((a,b)=>a+b.value,0);
  if(total <= 0){
    ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.arc(cx,cy,r,0,Math.PI*2,true);
    ctx.fillStyle = '#18212e'; ctx.fill('evenodd');
    return;
  }
  let start = -Math.PI/2;
  for(const it of items){
    const ang = (it.value/total)*Math.PI*2;
    ctx.beginPath();
    ctx.arc(cx,cy,R,start,start+ang);
    ctx.arc(cx,cy,r,start+ang,start,true);
    ctx.closePath();
    ctx.fillStyle = it.color;
    ctx.fill();
    start += ang;
  }
  ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.fillStyle = '#0e141e'; ctx.fill();
}

/* ========================= UI ================================= */
function toast(msg, kind){
  const box = document.getElementById('toast');
  const el = document.createElement('div');
  el.className = 'toast-msg ' + (kind||'');
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(()=>{ el.style.transition='opacity .3s'; el.style.opacity='0'; setTimeout(()=>el.remove(), 320); }, 2600);
  while(box.children.length > 5) box.removeChild(box.firstChild);
}

function sentimentLabel(v){
  if(v < 20) return t('sent.extremeFear');
  if(v < 40) return t('sent.fear');
  if(v < 60) return t('sent.neutral');
  if(v < 80) return t('sent.greed');
  return t('sent.extremeGreed');
}
function sentimentColor(v){
  if(v < 20) return 'var(--down)';
  if(v < 40) return '#f97316';
  if(v < 60) return 'var(--muted)';
  if(v < 80) return '#84cc16';
  return 'var(--up)';
}

function renderHeader(){
  const w = totalWealth();
  const pl = w - CONFIG.BASLANGIC_NAKIT;
  document.getElementById('hdrCash').textContent = fmtCash(state.player.cash);
  document.getElementById('hdrWorth').textContent = fmtCash(w);
  const plEl = document.getElementById('hdrPL');
  plEl.textContent = fmtCash(pl);
  plEl.className = 'val ' + cls(pl);
  document.getElementById('hdrTime').textContent = fmtTime(state.tick);
}

function renderTicker(){
  const track = document.getElementById('tickerTrack');
  const canlilar = aliveCompanies();
  let html = '';
  for(const c of canlilar){
    const k = cls(c.changePct);
    html += `<span class="tk" data-cid="${c.id}"><span class="fl">${c.flag}</span><b>${esc(c.ticker)}</b><span class="num">${c.price.toFixed(2)}</span><span class="ch ${k}">${fmtPct(c.changePct)}</span></span>`;
  }
  track.innerHTML = html + html;
  track.querySelectorAll('.tk').forEach(el=>{
    el.onclick = ()=> openCompany(Number(el.dataset.cid));
  });
}

/* ---------------------- DASHBOARD ---------------------- */
function renderDashboard(){
  const w = totalWealth();
  const pl = w - CONFIG.BASLANGIC_NAKIT;
  const plPct = (pl / CONFIG.BASLANGIC_NAKIT) * 100;
  const hv = holdingsValue();
  const e = state.economy;
  const canlilar = aliveCompanies();
  const sirali = [...canlilar].sort((a,b)=> b.changePct - a.changePct);
  const kazananlar = sirali.slice(0,5);
  const kaybedenler = sirali.slice(-5).reverse();
  const portHist = state.player.portfolioHistory.slice(-260);

  const view = document.getElementById('view-dashboard');
  view.innerHTML = `
  <div class="grid g4" style="margin-bottom:12px">
    <div class="card"><h3>${t('dash.totalWorth')}</h3><div class="kpi">${fmtCash(w)}</div>
      <div class="tiny ${cls(pl)}" style="margin-top:5px;font-family:var(--mono)">${fmtCash(pl)} (${fmtPct(plPct)})</div></div>
    <div class="card"><h3>${t('dash.cash')}</h3><div class="kpi">${fmtCash(state.player.cash)}</div>
      <div class="tiny muted" style="margin-top:5px">${t('dash.cashPct',{p:((state.player.cash/Math.max(w,1))*100).toFixed(0)})}</div></div>
    <div class="card"><h3>${t('dash.equity')}</h3><div class="kpi">${fmtCash(hv)}</div>
      <div class="tiny muted" style="margin-top:5px">${t('dash.inStocks',{n:Object.keys(state.player.positions).length})}</div></div>
    <div class="card"><h3>${t('dash.marketState')}</h3><div class="kpi-sm">${t('regime.'+state.market.regime)}</div>
      <div class="tiny" style="margin-top:6px">
        <span class="badge" style="background:rgba(255,255,255,.06);border-color:transparent;color:${sentimentColor(e.duygu)}">${sentimentLabel(e.duygu)}</span>
      </div></div>
  </div>

  <div class="grid g23" style="margin-bottom:12px">
    <div class="card">
      <h3>${t('dash.perf')} <span class="sub">${t('dash.elapsed',{t:fmtTime(state.tick)})}</span></h3>
      <div class="chart-wrap">
        <canvas class="chart" id="dashPortChart" style="height:220px"></canvas>
        <div class="tooltip" id="dashPortTip"></div>
      </div>
    </div>
    <div class="card">
      <h3>${LANG==='tr'?'Şu An Öne Çıkanlar':'Notable Movers'}</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <div class="tiny dim" style="margin-bottom:6px;letter-spacing:.08em;font-weight:800">${t('dash.gainers')}</div>
          ${kazananlar.map(c=>`
            <div class="row" style="justify-content:space-between;padding:3px 0;cursor:pointer" onclick="openCompany(${c.id})">
              <span style="font-weight:700;font-family:var(--mono);font-size:11.5px">${c.flag} ${esc(c.ticker)}</span>
              <span class="num ${cls(c.changePct)}" style="font-size:11.5px">${fmtPct(c.changePct)}</span>
            </div>`).join('')}
        </div>
        <div>
          <div class="tiny dim" style="margin-bottom:6px;letter-spacing:.08em;font-weight:800">${t('dash.losers')}</div>
          ${kaybedenler.map(c=>`
            <div class="row" style="justify-content:space-between;padding:3px 0;cursor:pointer" onclick="openCompany(${c.id})">
              <span style="font-weight:700;font-family:var(--mono);font-size:11.5px">${c.flag} ${esc(c.ticker)}</span>
              <span class="num ${cls(c.changePct)}" style="font-size:11.5px">${fmtPct(c.changePct)}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <div class="grid g32" style="margin-bottom:12px">
    <div class="card">
      <h3>${t('dash.econ')}</h3>
      ${econRow(t('econRow.inflation'), e.enflasyon.toFixed(2)+'%', e.prev.enflasyon)}
      ${econRow(t('econRow.rate'), e.faiz.toFixed(2)+'%', e.prev.faiz)}
      ${econRow(t('econRow.gdp'), e.gsyhBuyume.toFixed(2)+'%', e.prev.gsyhBuyume)}
      ${econRow(t('econRow.unemployment'), e.issizlik.toFixed(2)+'%', e.prev.issizlik)}
      ${econRow(t('econRow.consumer'), e.tuketiciGuveni.toFixed(1), e.prev.tuketiciGuveni)}
      <div style="margin-top:10px" class="tiny dim">${t('dash.cycle')}: <b style="color:var(--text)">${t('cycle.'+e.evre.toLowerCase())}</b></div>
    </div>
    <div class="card">
      <h3>${t('dash.recentNews')}</h3>
      <div class="scroll-y-sm">${renderNewsCards(state.news.slice(0,7))}</div>
    </div>
  </div>

  <div class="grid g2">
    <div class="card">
      <h3>${t('dash.watch')}</h3>
      ${state.watchlist.length ? `<div class="tbl-wrap"><table style="min-width:auto"><thead><tr>
        <th class="l">${LANG==='tr'?'Sembol':'Symbol'}</th><th>${t('market.price')}</th><th>${t('market.change')}</th></tr></thead><tbody>
        ${state.watchlist.map(id=>{
          const c = getCompany(id); if(!c) return '';
          return `<tr onclick="openCompany(${c.id})"><td class="l"><div class="td-co">${companyLogoHTML(c,22)}<span class="sym">${c.flag} ${esc(c.ticker)}</span></div></td>
          <td>${c.price.toFixed(2)}</td><td class="${cls(c.changePct)}">${fmtPct(c.changePct)}</td></tr>`;
        }).join('')}
        </tbody></table></div>` : `<div class="empty"><b>${t('dash.watchEmpty')}</b>${t('dash.watchHint')}</div>`}
    </div>
    <div class="card">
      <h3>${t('dash.summary')}</h3>
      <div class="tiny muted" style="line-height:2">
        <div class="row" style="justify-content:space-between"><span>${t('dash.totalTrades')}</span><span class="num">${state.player.stats.islemSayisi}</span></div>
        <div class="row" style="justify-content:space-between"><span>${t('dash.closedPL')}</span><span class="num ${cls(state.player.stats.realized)}">${fmtCash(state.player.stats.realized)}</span></div>
        <div class="row" style="justify-content:space-between"><span>${t('dash.dividends')}</span><span class="num">${fmtCash(state.player.stats.temettuler)}</span></div>
        <div class="row" style="justify-content:space-between"><span>${t('dash.teamLv')}</span><span class="num">${Object.values(state.player.employees).reduce((a,b)=>a+b,0)}/${CALISANLAR.length*3}</span></div>
        <div class="row" style="justify-content:space-between"><span>${t('dash.ach')}</span><span class="num">${state.player.achievements.length}/${BASARIMLAR.length}</span></div>
      </div>
    </div>
  </div>`;

  const cv = document.getElementById('dashPortChart');
  if(cv && portHist.length > 1){
    const pts = portHist.map(p=>({ x: p.d, y: p.value }));
    drawLineChart(cv, pts, { color:'#3b82f6', baseline: CONFIG.BASLANGIC_NAKIT, fmt: v=>fmtBig(v,1) });
    attachLineTooltip(cv, document.getElementById('dashPortTip'), portHist, v=>fmtCash(v));
  }
}

function econRow(label, value, prev){
  let deltaHtml = '';
  if(prev !== undefined && prev !== null && isFinite(prev)){
    const d = parseFloat(value) - prev;
    if(Math.abs(d) > 1e-6){
      deltaHtml = `<span class="num ${d>0?'up':'down'}" style="font-size:10.5px">${d>0?'▲':'▼'} ${Math.abs(d).toFixed(2)}</span>`;
    }
  }
  return `<div class="row" style="justify-content:space-between;padding:4.5px 0;border-bottom:1px solid #131b26">
    <span class="tiny muted">${label}</span>
    <span style="display:flex;gap:8px;align-items:center"><span class="num" style="font-size:12px;font-weight:600">${value}</span>${deltaHtml}</span>
  </div>`;
}

function catInfo(cat){
  switch(cat){
    case 'macro': return { icon:'🏛️', badge:LANG==='tr'?'Ekonomi':'Economy', cls:'nb-macro' };
    case 'sector': return { icon:'🏭', badge:LANG==='tr'?'Sektör':'Sector', cls:'nb-sector' };
    case 'crisis': return { icon:'⚠️', badge:LANG==='tr'?'Kriz':'Crisis', cls:'nb-crisis' };
    case 'earnings': return { icon:'📊', badge:LANG==='tr'?'Bilanço':'Earnings', cls:'nb-earnings' };
    case 'dividend': return { icon:'💵', badge:LANG==='tr'?'Kâr Payı':'Dividend', cls:'nb-dividend' };
    case 'policy': return { icon:'📜', badge:LANG==='tr'?'Politika':'Policy', cls:'nb-policy' };
    default: return { icon:'🏢', badge:LANG==='tr'?'Şirket':'Company', cls:'nb-company' };
  }
}

function renderNewsCards(items){
  if(!items.length) return `<div class="empty"><b>${t('news.none')}</b></div>`;
  return items.map((n,i)=>{
    const tone = n.tone > 0 ? 'pos' : (n.tone < 0 ? 'neg' : 'neu');
    const { icon, badge, cls: badgeCls } = catInfo(n.cat);
    const idx = state.news.indexOf(n);
    const isNew = (state.tick - (n.tick || 0)) < 10 && state.newsViewedTick !== undefined && n.d > state.newsViewedTick;
    return `<div class="news-card tone-${tone} ${n.major?'major':''}${isNew?' new':''}" data-idx="${idx}">
      <div class="news-icon">${icon}</div>
      <div class="news-body">
        <div class="news-headline">${n.major?'⭐ ':''}${esc(n.headline)}</div>
        <div class="news-footer">
          <span class="news-badge ${badgeCls}">${badge}</span>
          ${n.ticker ? `<span style="color:var(--accent)">${n.flag?n.flag+' ':''}${esc(n.ticker)}</span>` : ''}
          <span>${fmtTime(n.d*CONFIG.CYCLE_TICKS)}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}

/* ---------------------- MARKET ---------------------- */
function renderMarket(){
  const view = document.getElementById('view-market');
  const ui = state.ui;
  let liste = aliveCompanies();
  if(ui.sectorFilter && ui.sectorFilter !== '__all__'){
    liste = liste.filter(c=>c.sector === ui.sectorFilter);
  }
  if(ui.countryFilter && ui.countryFilter !== '__all__'){
    if(ui.countryFilter === 'TR') liste = liste.filter(c=> c.country === 'TR');
    else if(ui.countryFilter === 'GLOBAL') liste = liste.filter(c=> c.country !== 'TR');
  }
  if(ui.marketFilter){
    const q = ui.marketFilter.toLowerCase();
    liste = liste.filter(c=> c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q) || c.sector.toLowerCase().includes(q) || (c.countryName||'').toLowerCase().includes(q));
  }
  const key = ui.marketSort.key;
  const dir = ui.marketSort.dir;
  liste = [...liste].sort((a,b)=>{
    let va, vb;
    if(key === 'name'){ va = a.name; vb = b.name; return va.localeCompare(vb)*dir; }
    if(key === 'sector'){ va = a.sector; vb = b.sector; return va.localeCompare(vb)*dir; }
    if(key === 'country'){ va = a.countryName||''; vb = b.countryName||''; return va.localeCompare(vb)*dir; }
    if(key === 'pe'){ va = a.eps>0.012 ? a.price/a.eps : 9999; vb = b.eps>0.012 ? b.price/b.eps : 9999; }
    else { va = a[key]; vb = b[key]; }
    return (va - vb) * dir;
  });
  const sektorSecenek = [['__all__', LANG==='tr'?'Tüm Sektörler':'All Sectors'], ...SEKTOR_ADLARI.map(s=>[s,s])].map(([v,l])=>`<option value="${v}" ${ui.sectorFilter===v?'selected':''}>${l}</option>`).join('');
  const trSay = aliveCompanies().filter(c=>c.country==='TR').length;
  const glbSay = aliveCompanies().filter(c=>c.country!=='TR').length;

  view.innerHTML = `
  <div class="card" style="margin-bottom:12px">
    <div class="row" style="justify-content:space-between">
      <div class="row">
        <input id="mktSearch" placeholder="${t('market.search')}" value="${esc(ui.marketFilter)}" style="width:250px">
        <select id="mktCountry">
          <option value="__all__" ${ui.countryFilter==='__all__'?'selected':''}>${t('market.allCountries')}</option>
          <option value="TR" ${ui.countryFilter==='TR'?'selected':''}>${t('market.turkey')} (${trSay})</option>
          <option value="GLOBAL" ${ui.countryFilter==='GLOBAL'?'selected':''}>${t('market.global')} (${glbSay})</option>
        </select>
        <select id="mktSector">${sektorSecenek}</select>
      </div>
      <div class="tiny dim">${liste.length} ${t('market.stocks')}</div>
    </div>
  </div>
  <div class="card">
    <div class="tbl-wrap">
      <table>
        <thead><tr>
          <th class="l" data-k="name">${t('market.company')}</th>
          <th data-k="price">${t('market.price')}</th>
          <th data-k="changePct">${t('market.change')}</th>
          <th data-k="marketCap">${t('market.mcap')}</th>
          <th data-k="pe">${t('market.pe')}</th>
          <th data-k="dividendYield">${t('market.div')}</th>
          <th class="l" data-k="sector">${t('market.sector')}</th>
          <th class="l" data-k="country">${t('market.country')}</th>
        </tr></thead>
        <tbody>
          ${liste.map(c=>{
            const pe = c.eps > 0.012 ? (c.price/c.eps) : null;
            return `<tr onclick="openCompany(${c.id})">
              <td class="l"><div class="td-co">${companyLogoHTML(c,26)}<div><div><span class="sym">${c.flag} ${esc(c.ticker)}</span></div><div class="cname">${esc(c.name)}</div></div></div></td>
              <td>${c.price.toFixed(2)}</td>
              <td class="${cls(c.changePct)}">${fmtPct(c.changePct)}</td>
              <td>${fmtBig(c.marketCap)}</td>
              <td>${pe === null ? '—' : pe.toFixed(1)}</td>
              <td>${c.dividendYield.toFixed(2)}%</td>
              <td class="l tiny muted">${esc(c.sector)}</td>
              <td class="l tiny muted">${c.flag} ${esc(c.countryName||'')}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>`;

  document.getElementById('mktSearch').oninput = (ev)=>{
    state.ui.marketFilter = ev.target.value;
    renderMarket();
    const el = document.getElementById('mktSearch');
    el.focus(); el.setSelectionRange(el.value.length, el.value.length);
  };
  document.getElementById('mktSector').onchange = (ev)=>{
    state.ui.sectorFilter = ev.target.value;
    renderMarket();
  };
  document.getElementById('mktCountry').onchange = (ev)=>{
    state.ui.countryFilter = ev.target.value;
    renderMarket();
  };
  view.querySelectorAll('th[data-k]').forEach(th=>{
    th.onclick = ()=>{
      const k = th.dataset.k;
      if(state.ui.marketSort.key === k) state.ui.marketSort.dir *= -1;
      else state.ui.marketSort = { key: k, dir: -1 };
      renderMarket();
    };
  });
}

/* ---------------------- PORTFOLIO ---------------------- */
function renderPortfolio(){
  const view = document.getElementById('view-portfolio');
  const pozisyonlar = [];
  let toplamMaliyet = 0, toplamDeger = 0;
  for(const id in state.player.positions){
    const pos = state.player.positions[id];
    if(!pos || pos.shares <= 0) continue;
    const c = getCompany(Number(id));
    if(!c) continue;
    const deger = c.alive ? pos.shares * c.price : 0;
    const pl = deger - pos.cost;
    const getiri = pos.cost > 0 ? (pl/pos.cost)*100 : 0;
    toplamMaliyet += pos.cost;
    toplamDeger += deger;
    pozisyonlar.push({ c, pos, deger, pl, getiri });
  }
  pozisyonlar.sort((a,b)=> b.deger - a.deger);
  const w = totalWealth();
  const toplamPL = toplamDeger - toplamMaliyet;

  const sektoreGore = {};
  for(const p of pozisyonlar){
    sektoreGore[p.c.sector] = (sektoreGore[p.c.sector]||0) + p.deger;
  }
  const donutItems = Object.keys(sektoreGore).map((k,i)=>({
    label: k, value: sektoreGore[k], color: PALET[i % PALET.length]
  }));
  if(state.player.cash > 0) donutItems.push({ label: t('dash.cash'), value: state.player.cash, color:'#3b4a5e' });
  const hist = state.player.portfolioHistory.slice(-300);

  const danismanLvl = getEmployeeLevel('portfoy_danismani');
  let danismanPanel = '';
  if(danismanLvl >= 1 && pozisyonlar.length > 0){
    const enZayif = [...pozisyonlar].sort((a,b)=> a.getiri - b.getiri)[0];
    let icerik = `<div class="tiny muted" style="line-height:1.75">`;
    icerik += `<div>• ${t('port.weak', {t:enZayif.c.flag+' '+enZayif.c.ticker, p:fmtPct(enZayif.getiri)})}</div>`;
    if(danismanLvl >= 2){
      const pozSay = pozisyonlar.length;
      const karliSay = pozisyonlar.filter(p=>p.getiri > 0).length;
      const cesitlilik = Math.min(100, pozSay * 15);
      const karliOran = pozSay > 0 ? (karliSay/pozSay)*100 : 0;
      const saglik = Math.round((cesitlilik + karliOran) / 2);
      let skorRenk = 'var(--muted)';
      if(saglik > 70) skorRenk = 'var(--up)';
      else if(saglik < 40) skorRenk = 'var(--down)';
      icerik += `<div>• ${t('port.health', {c:skorRenk, s:saglik})}</div>`;
    }
    if(danismanLvl >= 3){
      const pozSay = pozisyonlar.length;
      if(pozSay < 5){
        icerik += `<div>• ${t('port.warnDiversify', {n:pozSay})}</div>`;
      }
      const enBuyuk = pozisyonlar[0];
      if(enBuyuk && enBuyuk.deger / Math.max(toplamDeger,1) > 0.4){
        icerik += `<div>• ${t('port.warnConcentrated', {p:((enBuyuk.deger/Math.max(toplamDeger,1))*100).toFixed(0)})}</div>`;
      }
      if(pozSay >= 5 && enBuyuk && enBuyuk.deger / Math.max(toplamDeger,1) < 0.4){
        icerik += `<div>• ${t('port.goodDiv')}</div>`;
      }
    }
    icerik += `</div>`;
    danismanPanel = `
      <div class="card" style="margin-top:12px">
        <h3>${t('port.advisorTitle')} <span class="sub">${t('port.advisorSub',{lvl:danismanLvl})}</span></h3>
        ${icerik}
        <p class="tiny dim" style="margin-top:8px;font-style:italic">${t('port.disclaimer')}</p>
      </div>`;
  }

  view.innerHTML = `
  <div class="grid g4" style="margin-bottom:12px">
    <div class="card"><h3>${t('dash.totalWorth')}</h3><div class="kpi">${fmtCash(w)}</div></div>
    <div class="card"><h3>${t('dash.cash')}</h3><div class="kpi">${fmtCash(state.player.cash)}</div></div>
    <div class="card"><h3>${t('port.equity')}</h3><div class="kpi">${fmtCash(toplamDeger)}</div></div>
    <div class="card"><h3>${t('port.unrealized')}</h3><div class="kpi ${cls(toplamPL)}">${fmtCash(toplamPL)}</div></div>
  </div>

  <div class="grid g23" style="margin-bottom:12px">
    <div class="card">
      <h3>${t('dash.perf')}</h3>
      <div class="chart-wrap">
        <canvas class="chart" id="portChart" style="height:220px"></canvas>
        <div class="tooltip" id="portTip"></div>
      </div>
    </div>
    <div class="card">
      <h3>${t('port.alloc')}</h3>
      <div class="chart-wrap"><canvas class="chart" id="portDonut" style="height:180px"></canvas></div>
      <div class="tiny muted" style="margin-top:8px;line-height:1.9">
        ${donutItems.map(d=>`<div class="row" style="justify-content:space-between"><span><i style="display:inline-block;width:9px;height:9px;border-radius:2px;background:${d.color};margin-right:6px;vertical-align:middle"></i>${esc(d.label)}</span><span class="num">${((d.value/Math.max(w,1))*100).toFixed(0)}%</span></div>`).join('')}
      </div>
    </div>
  </div>

  <div class="card">
    <h3>${t('port.myStocks')}</h3>
    ${pozisyonlar.length ? `
    <div class="tbl-wrap"><table>
      <thead><tr>
        <th class="l">${t('market.company')}</th><th>${t('port.shares')}</th><th>${t('port.avg')}</th><th>${t('port.last')}</th>
        <th>${t('port.value')}</th><th>${t('port.pl')}</th><th>${t('port.ret')}</th>
      </tr></thead>
      <tbody>
      ${pozisyonlar.map(p=>{
        const ort = p.pos.cost / p.pos.shares;
        return `<tr onclick="openCompany(${p.c.id})">
          <td class="l"><div class="td-co">${companyLogoHTML(p.c,26)}<div><div><span class="sym">${p.c.flag} ${esc(p.c.ticker)}</span></div><div class="cname">${esc(p.c.name)}</div></div></div></td>
          <td>${p.pos.shares.toLocaleString('en-US')}</td>
          <td>${ort.toFixed(2)}</td>
          <td>${p.c.price.toFixed(2)}</td>
          <td>${fmtCash(p.deger)}</td>
          <td class="${cls(p.pl)}">${fmtCash(p.pl)}</td>
          <td class="${cls(p.getiri)}">${fmtPct(p.getiri)}</td>
        </tr>`;
      }).join('')}
      </tbody></table></div>` : `<div class="empty"><b>${t('port.empty')}</b>${t('port.emptyHint')}</div>`}
  </div>
  ${danismanPanel}`;

  const cv = document.getElementById('portChart');
  if(cv && hist.length > 1){
    const pts = hist.map(p=>({ x:p.d, y:p.value }));
    const up = pts[pts.length-1].y >= CONFIG.BASLANGIC_NAKIT;
    drawLineChart(cv, pts, { color: up ? '#22c55e' : '#ef4444', baseline: CONFIG.BASLANGIC_NAKIT, fmt:v=>fmtBig(v,1) });
    attachLineTooltip(cv, document.getElementById('portTip'), hist, v=>fmtCash(v));
  }
  const dc = document.getElementById('portDonut');
  if(dc) drawDonut(dc, donutItems);
}

const PALET = ['#3b82f6','#22c55e','#f59e0b','#a855f7','#06b6d4','#ef4444','#84cc16','#ec4899','#14b8a6','#f97316','#8b5cf6','#0ea5e9','#eab308','#10b981','#f43f5e','#6366f1'];

/* ---------------------- WATCHLIST ---------------------- */
function renderWatchlist(){
  const view = document.getElementById('view-watchlist');
  const items = state.watchlist.map(id=>getCompany(id)).filter(Boolean);
  view.innerHTML = `
  <div class="card">
    <h3>${t('watch.title')} <span class="sub">${items.length} ${t('watch.stocks')}</span></h3>
    ${items.length ? `
    <div class="tbl-wrap"><table>
      <thead><tr>
        <th class="l">${t('market.company')}</th><th>${t('market.price')}</th><th>${t('market.change')}</th>
        <th class="l">${t('market.sector')}</th><th class="l">${t('market.country')}</th><th class="l"></th>
      </tr></thead>
      <tbody>
      ${items.map(c=>`<tr onclick="openCompany(${c.id})">
        <td class="l"><div class="td-co">${companyLogoHTML(c,26)}<div><div><span class="sym">${c.flag} ${esc(c.ticker)}</span></div><div class="cname">${esc(c.name)}</div></div></div></td>
        <td>${c.price.toFixed(2)}</td>
        <td class="${cls(c.changePct)}">${fmtPct(c.changePct)}</td>
        <td class="l tiny muted">${esc(c.sector)}</td>
        <td class="l tiny muted">${c.flag} ${esc(c.countryName||'')}</td>
        <td class="l"><button class="sell" data-rm="${c.id}" style="padding:3px 8px;font-size:10.5px">${t('watch.remove')}</button></td>
      </tr>`).join('')}
      </tbody></table></div>` : `<div class="empty"><b>${t('watch.empty')}</b>${t('watch.emptyHint')}</div>`}
  </div>`;
  view.querySelectorAll('[data-rm]').forEach(b=>{
    b.onclick = (e)=>{
      e.stopPropagation();
      const id = Number(b.dataset.rm);
      state.watchlist = state.watchlist.filter(x=>x !== id);
      renderWatchlist();
      toast(t('common.watchRemove'));
    };
  });
}

/* ---------------------- NEWS ---------------------- */
function renderNews(){
  const view = document.getElementById('view-news');
  const filtre = state.ui.newsFilter || 'all';
  let items = state.news;
  if(filtre === 'company') items = items.filter(n=> n.cat === 'company' || !n.cat);
  else if(filtre === 'earnings') items = items.filter(n=> n.cat === 'earnings' || n.cat === 'dividend');
  else if(filtre === 'macro') items = items.filter(n=> n.cat === 'macro');
  else if(filtre === 'sector') items = items.filter(n=> n.cat === 'sector');
  else if(filtre === 'crisis') items = items.filter(n=> n.cat === 'crisis');
  else if(filtre === 'policy') items = items.filter(n=> n.cat === 'policy');
  else if(filtre === 'major') items = items.filter(n=> n.major);

  view.innerHTML = `
  <div class="card">
    <div class="row" style="justify-content:space-between;margin-bottom:12px">
      <h3 style="margin:0">${t('news.title')} <span class="sub">${items.length} ${t('news.count')}</span></h3>
    </div>
    <div class="news-toolbar">
      <div class="news-filter">
        <button data-f="all" class="${filtre==='all'?'active':''}">${t('news.all')}</button>
        <button data-f="major" class="${filtre==='major'?'active':''}">${t('news.major')}</button>
        <button data-f="company" class="${filtre==='company'?'active':''}">${t('news.company')}</button>
        <button data-f="earnings" class="${filtre==='earnings'?'active':''}">${t('news.earnDiv')}</button>
        <button data-f="macro" class="${filtre==='macro'?'active':''}">${t('news.macro')}</button>
        <button data-f="policy" class="${filtre==='policy'?'active':''}">${LANG==='tr'?'📜 Politika':'📜 Policy'}</button>
        <button data-f="sector" class="${filtre==='sector'?'active':''}">${t('news.sector')}</button>
        <button data-f="crisis" class="${filtre==='crisis'?'active':''}">${t('news.crisis')}</button>
      </div>
    </div>
    <div class="scroll-y" style="max-height:640px">
      ${renderNewsCards(items)}
    </div>
  </div>`;

  state.unreadNews = 0;
  state.newsViewedTick = state.cycle;
  updateNewsBadge();

  view.querySelectorAll('[data-f]').forEach(b=>{
    b.onclick = ()=>{
      state.ui.newsFilter = b.dataset.f;
      renderNews();
    };
  });
  view.querySelectorAll('.news-card').forEach(card=>{
    card.onclick = ()=>{
      const idx = Number(card.dataset.idx);
      openNewsDetail(state.news[idx]);
    };
  });
}

/* ---------------------- EXPERT ---------------------- */
function expertRow(c){
  return `<div class="expert-row" data-open="${c.id}">
    <div class="expert-co">
      ${companyLogoHTML(c,24)}
      <div style="min-width:0">
        <div class="sym">${c.flag} ${esc(c.ticker)}</div>
        <div class="cname">${esc(c.name)}</div>
      </div>
    </div>
    <div class="expert-val">
      <div class="p">${c.price.toFixed(2)}</div>
      <div class="c ${cls(c.changePct)}">${fmtPct(c.changePct)}</div>
    </div>
  </div>`;
}

function renderExpert(){
  const view = document.getElementById('view-expert');
  const canlilar = aliveCompanies();
  if(!canlilar.length){
    view.innerHTML = `<div class="card"><div class="empty"><b>${t('expert.noCo')}</b></div></div>`;
    return;
  }

  const yukselenler = [...canlilar].sort((a,b)=> b.changePct - a.changePct).slice(0, 8);
  const dusenler = [...canlilar].sort((a,b)=> a.changePct - b.changePct).slice(0, 8);

  const dikkat = canlilar.map(c=>{
    const sektorPE = SEKTORLER[c.sector].peTab;
    const pe = c.eps > 0.012 ? c.price/c.eps : null;
    const debtRatio = c.debt / Math.max(c.revenue, 1);
    let skor = 0;
    skor += c.growth * 0.35;
    skor += c.profitMargin * 0.25;
    skor -= debtRatio * 14;
    skor += (c.management - 50) * 0.14;
    skor += (c.innovation - 50) * 0.10;
    if(pe !== null) skor += (sektorPE - pe) * 0.35;
    skor += c.momentum * 50;
    skor += (c.sentiment - 50) * 0.12;
    skor += c.newsImpact * 80;
    return { c, skor };
  }).sort((a,b)=> b.skor - a.skor).slice(0, 8);

  const veriLvl = getEmployeeLevel('veri_bilimci');
  let heatmapPanel = '';
  if(veriLvl >= 2){
    const sektorStat = {};
    for(const s of SEKTOR_ADLARI){
      const liste = canlilar.filter(c=>c.sector === s);
      if(!liste.length) continue;
      const ort = liste.reduce((a,c)=>a + c.changePct, 0)/liste.length;
      sektorStat[s] = ort;
    }
    const sortedS = Object.entries(sektorStat).sort((a,b)=> b[1]-a[1]);
    heatmapPanel = `
      <div class="card" style="margin-top:12px">
        <h3>${t('expert.heat')} <span class="sub">${t('expert.heatSub',{lvl:veriLvl})}</span></h3>
        <p class="tiny dim" style="margin-bottom:10px">${t('expert.heatDesc')}</p>
        <div class="heatmap">
          ${sortedS.map(([name, val])=>{
            let cls = '';
            const a = Math.abs(val);
            if(val > 0.05) cls = a > 2 ? 'hm-up3' : (a > 0.8 ? 'hm-up2' : 'hm-up1');
            else if(val < -0.05) cls = a > 2 ? 'hm-dn3' : (a > 0.8 ? 'hm-dn2' : 'hm-dn1');
            return `<div class="hm-cell ${cls}"><div class="n">${esc(name)}</div><div class="v ${cls(val)}">${fmtPct(val)}</div></div>`;
          }).join('')}
        </div>
      </div>`;
  }

  view.innerHTML = `
  <div class="card" style="margin-bottom:12px">
    <h3>${t('expert.title')} <span class="sub">${t('expert.sub')}</span></h3>
    <p class="tiny muted" style="line-height:1.7">
      ${t('expert.intro')}
    </p>
  </div>

  <div class="grid g3">
    <div class="card">
      <h3 style="color:var(--up)">${t('expert.gaining')}</h3>
      <p class="tiny dim" style="margin-bottom:8px">${t('expert.gainingSub')}</p>
      ${yukselenler.map(c=>expertRow(c)).join('')}
    </div>
    <div class="card">
      <h3 style="color:var(--down)">${t('expert.losing')}</h3>
      <p class="tiny dim" style="margin-bottom:8px">${t('expert.losingSub')}</p>
      ${dusenler.map(c=>expertRow(c)).join('')}
    </div>
    <div class="card">
      <h3 style="color:var(--warn)">${t('expert.notable')}</h3>
      <p class="tiny dim" style="margin-bottom:8px">${t('expert.notableSub')}</p>
      ${dikkat.map(({c})=>expertRow(c)).join('')}
    </div>
  </div>

  <div class="card" style="margin-top:12px">
    <h3>${t('expert.summary')}</h3>
    <div class="grid g4">
      <div><div class="tiny dim">${t('expert.regime')}</div><div class="kpi-sm">${t('regime.'+state.market.regime)}</div></div>
      <div><div class="tiny dim">${t('expert.upDown')}</div><div class="kpi-sm"><span class="up">${canlilar.filter(c=>c.changePct>0).length}</span> / <span class="down">${canlilar.filter(c=>c.changePct<0).length}</span></div></div>
      <div><div class="tiny dim">${t('expert.avgChange')}</div><div class="kpi-sm ${cls(canlilar.reduce((a,c)=>a+c.changePct,0)/canlilar.length)}">${fmtPct(canlilar.reduce((a,c)=>a+c.changePct,0)/canlilar.length)}</div></div>
      <div><div class="tiny dim">${t('expert.sentiment')}</div><div class="kpi-sm" style="color:${sentimentColor(state.economy.duygu)}">${sentimentLabel(state.economy.duygu)}</div></div>
    </div>
  </div>
  ${heatmapPanel}`;

  view.querySelectorAll('[data-open]').forEach(el=>{
    el.onclick = ()=> openCompany(Number(el.dataset.open));
  });
}

/* ---------------------- TEAM ---------------------- */
function renderTeam(){
  const view = document.getElementById('view-team');
  const toplamSeviye = Object.values(state.player.employees||{}).reduce((a,b)=>a+b,0);
  const maxSeviye = CALISANLAR.length * 3;

  view.innerHTML = `
  <div class="card" style="margin-bottom:12px">
    <h3>${t('team.title')} <span class="sub">${t('team.levels',{a:toplamSeviye,b:maxSeviye})}</span></h3>
    <p class="tiny muted" style="line-height:1.75">
      ${t('team.intro')}
    </p>
    <p class="tiny dim" style="margin-top:8px">
      ${t('team.note')}
    </p>
  </div>

  <div class="grid g2">
    ${CALISANLAR.map(emp => {
      const lvl = getEmployeeLevel(emp.id);
      const next = lvl < emp.seviyeler.length ? emp.seviyeler[lvl] : null;
      const maxed = lvl >= emp.seviyeler.length;
      return `<div class="card">
        <h3>${emp.icon} ${empName(emp)} <span class="sub">${t('team.levelN',{n:lvl,m:emp.seviyeler.length})}</span></h3>
        <p class="tiny muted" style="margin-bottom:10px">${empDesc(emp)}</p>
        <div style="margin-bottom:12px">
          ${emp.seviyeler.map((s,i)=>{
            const done = i < lvl;
            return `<div class="emp-lvl ${done?'done':''}">
              <span class="txt">${done?'✓':'○'} ${LANG==='tr'?'Sv':'Lv'}${i+1}: ${esc(empLvlText(emp,i))}</span>
              <span class="price">$${s.fiyat.toLocaleString('en-US')}</span>
            </div>`;
          }).join('')}
        </div>
        ${maxed ? `<div class="tiny up" style="text-align:center;padding:8px">${t('team.maxed')}</div>` :
        `<button class="gold" data-hire="${emp.id}" style="width:100%" ${state.player.cash < next.fiyat ? 'disabled':''}>
          ${lvl === 0 ? t('team.hire') : t('team.upgrade')} — $${next.fiyat.toLocaleString('en-US')}
        </button>`}
      </div>`;
    }).join('')}
  </div>`;

  view.querySelectorAll('[data-hire]').forEach(b=>{
    b.onclick = ()=>{
      const emp = CALISANLAR.find(e=>e.id === b.dataset.hire);
      if(!emp) return;
      const lvl = getEmployeeLevel(emp.id);
      if(lvl >= emp.seviyeler.length) return;
      const next = emp.seviyeler[lvl];
      if(state.player.cash < next.fiyat){ toast(t('common.insufficient'), 'err'); return; }
      state.player.cash -= next.fiyat;
      state.player.employees[emp.id] = lvl + 1;
      const key = lvl === 0 ? 'common.staffHired' : 'common.staffUpgraded';
      toast(t(key, {icon:emp.icon, name:empName(emp), lvl:lvl+1}), 'ok');
      renderHeader();
      renderTeam();
    };
  });
}

/* ---------------------- STATISTICS ---------------------- */
const BASARIMLAR = [
  { id:'first_trade', icon:'🎯', name:'First Step', name_tr:'İlk Adım', desc:'Make your first trade', desc_tr:'İlk işlemini yap', test:()=> state.player.stats.islemSayisi >= 1 },
  { id:'first_div', icon:'💰', name:'First Dividend', name_tr:'İlk Kâr Payı', desc:'Receive your first dividend', desc_tr:'İlk kâr payını al', test:()=> state.player.stats.temettuler > 0 },
  { id:'green', icon:'📈', name:'In the Green', name_tr:'Yeşil Bölge', desc:'Reach $2,500 net worth', desc_tr:'2.500 $ toplam varlığa ulaş', test:()=> totalWealth() >= 2500 },
  { id:'rich', icon:'🏆', name:'Small Fortune', name_tr:'Küçük Servet', desc:'Reach $10,000 net worth', desc_tr:'10.000 $ toplam varlığa ulaş', test:()=> totalWealth() >= 10000 },
  { id:'diversified', icon:'🧺', name:'Diversified', name_tr:'Çeşitlendirilmiş', desc:'Own 5 different stocks', desc_tr:'5 farklı hisseye sahip ol', test:()=> Object.keys(state.player.positions).filter(k=>state.player.positions[k].shares>0).length >= 5 },
  { id:'crash', icon:'🛡️', name:'Rode the Storm', name_tr:'Krizi Atlattın', desc:'Experience a bear market (after 30 cycles)', desc_tr:'Düşüş piyasası yaşa (30 döngü sonrası)', test:()=> state.market.regime === 'bear' && state.cycle > 30 },
  { id:'longterm', icon:'⏳', name:'Long-Term', name_tr:'Uzun Vadeli', desc:'Play 250 cycles', desc_tr:'250 döngü oyna', test:()=> state.cycle >= 250 },
  { id:'trader', icon:'⚡', name:'Active Trader', name_tr:'Aktif Yatırımcı', desc:'Make 50 trades', desc_tr:'50 işlem yap', test:()=> state.player.stats.islemSayisi >= 50 },
  { id:'divking', icon:'👑', name:'Dividend King', name_tr:'Kâr Payı Kralı', desc:'Collect $2,000 in dividends', desc_tr:'2.000 $ kâr payı topla', test:()=> state.player.stats.temettuler >= 2000 },
  { id:'team', icon:'👥', name:'Team Builder', name_tr:'Ekip Kuran', desc:'Hire every staff member', desc_tr:'Tüm çalışanları işe al', test:()=> CALISANLAR.every(e=> getEmployeeLevel(e.id) >= 1) },
  { id:'global', icon:'🌐', name:'Global Player', name_tr:'Global Oyuncu', desc:'Invest in both TR and Global stocks', desc_tr:'Hem TR hem Global şirkete yatırım yap', test:()=>{
    let tr = false, gl = false;
    for(const id in state.player.positions){
      const c = getCompany(Number(id));
      if(!c) continue;
      if(c.country === 'TR') tr = true; else gl = true;
    }
    return tr && gl;
  } }
];

function achName(a){ return LANG === 'tr' ? a.name_tr : a.name; }
function achDesc(a){ return LANG === 'tr' ? a.desc_tr : a.desc; }

function checkAchievements(){
  for(const a of BASARIMLAR){
    if(state.player.achievements.includes(a.id)) continue;
    try{
      if(a.test()){
        state.player.achievements.push(a.id);
        toast(t('common.achUnlocked', {n:achName(a)}), 'gold');
      }
    }catch(e){}
  }
}

function renderStats(){
  const view = document.getElementById('view-stats');
  const s = state.player.stats;
  const w = totalWealth();
  const pl = w - CONFIG.BASLANGIC_NAKIT;

  view.innerHTML = `
  <div class="grid g4" style="margin-bottom:12px">
    <div class="card"><h3>${t('stats.totalWorth')}</h3><div class="kpi">${fmtCash(w)}</div></div>
    <div class="card"><h3>${t('stats.totalPL')}</h3><div class="kpi ${cls(pl)}">${fmtCash(pl)}</div></div>
    <div class="card"><h3>${t('stats.realized')}</h3><div class="kpi ${cls(s.realized)}">${fmtCash(s.realized)}</div></div>
    <div class="card"><h3>${t('stats.dividends')}</h3><div class="kpi">${fmtCash(s.temettuler)}</div></div>
  </div>
  <div class="grid g4" style="margin-bottom:12px">
    <div class="card"><h3>${t('stats.totalTrades')}</h3><div class="kpi-sm">${s.islemSayisi}</div></div>
    <div class="card"><h3>${t('stats.peakWorth')}</h3><div class="kpi-sm">${fmtCash(s.enYuksekDeger)}</div></div>
    <div class="card"><h3>${t('stats.maxDD')}</h3><div class="kpi-sm down">${(s.maxDusus*100).toFixed(1)}%</div></div>
    <div class="card"><h3>${t('stats.played')}</h3><div class="kpi-sm">${fmtTime(state.tick)}</div></div>
  </div>
  <div class="grid g2" style="margin-bottom:12px">
    <div class="card">
      <h3>${t('stats.bestWorst')}</h3>
      <div class="row" style="justify-content:space-between;padding:8px 0;border-bottom:1px solid #131b26">
        <span class="muted tiny">${t('stats.best')}</span>
        <span class="num ${cls(s.enIyiIslem||0)}">${s.enIyiIslem === null ? '—' : fmtCash(s.enIyiIslem)}</span>
      </div>
      <div class="row" style="justify-content:space-between;padding:8px 0">
        <span class="muted tiny">${t('stats.worst')}</span>
        <span class="num ${cls(s.enKotuIslem||0)}">${s.enKotuIslem === null ? '—' : fmtCash(s.enKotuIslem)}</span>
      </div>
      <div class="tiny dim" style="margin-top:10px">${t('stats.seed')}: <span class="num">${state.seed}</span></div>
    </div>
    <div class="card">
      <h3>${t('stats.saveLoad')}</h3>
      <p class="tiny muted" style="margin-bottom:10px">${t('stats.autosave')}</p>
      <div class="row">
        <button id="stSave" class="primary">${t('stats.saveBtn')}</button>
        <button id="stLoad">${t('stats.loadBtn')}</button>
        <button id="stNew" class="sell">${t('stats.newBtn')}</button>
      </div>
    </div>
  </div>
  <div class="card">
    <h3>${t('stats.ach')} <span class="sub">${state.player.achievements.length}/${BASARIMLAR.length}</span></h3>
    <div class="grid g3" style="gap:8px">
      ${BASARIMLAR.map(a=>{
        const got = state.player.achievements.includes(a.id);
        return `<div class="ach ${got?'':'locked'}">
          <div class="ico">${a.icon}</div>
          <div><div class="t">${achName(a)}</div><div class="d">${achDesc(a)}</div></div>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  document.getElementById('stSave').onclick = ()=>{ saveGame(); };
  document.getElementById('stLoad').onclick = ()=>{ if(loadGame()){ render(); toast(t('common.toastLoaded'),'ok'); } };
  document.getElementById('stNew').onclick = ()=>{ if(confirm(t('common.confirmNew'))){ startNewGame(); } };
}

/* ---------------------- MODAL ---------------------- */
function openCompany(id){
  const c = getCompany(id);
  if(!c) return;
  state.ui.selected = id;
  renderCompanyModal();
}

function closeModal(){
  document.getElementById('modal').classList.add('hidden');
  document.getElementById('modal').innerHTML = '';
  state.ui.selected = null;
}

function buildExpertOpinion(c){
  const sec = SEKTORLER[c.sector];
  const pe = c.eps > 0.012 ? c.price/c.eps : null;
  const sektorPE = sec.peTab;
  const debtRatio = c.debt / Math.max(c.revenue, 1);

  let riskLabel, riskCls;
  if(c.risk < 30){ riskLabel = LANG==='tr'?'Düşük Oynaklık':'Low Volatility'; riskCls = 'b-up'; }
  else if(c.risk < 60){ riskLabel = LANG==='tr'?'Orta Oynaklık':'Medium Volatility'; riskCls = 'b-warn'; }
  else { riskLabel = LANG==='tr'?'Yüksek Oynaklık':'High Volatility'; riskCls = 'b-down'; }

  let valLabel, valCls;
  if(pe === null){ valLabel = LANG==='tr'?'Değerleme Belirsiz':'Valuation Unclear'; valCls = 'b-neu'; }
  else if(pe < sektorPE * 0.8){ valLabel = LANG==='tr'?'Sektöre Göre Ucuz':'Cheap vs Sector'; valCls = 'b-up'; }
  else if(pe > sektorPE * 1.2){ valLabel = LANG==='tr'?'Sektöre Göre Pahalı':'Pricey vs Sector'; valCls = 'b-down'; }
  else { valLabel = LANG==='tr'?'Sektör Ortalamasında':'In Line with Sector'; valCls = 'b-neu'; }

  let buyumeLabel, buyumeCls;
  if(c.growth > 15){ buyumeLabel = LANG==='tr'?'Güçlü Büyüme':'Strong Growth'; buyumeCls = 'b-up'; }
  else if(c.growth > 5){ buyumeLabel = LANG==='tr'?'Ilımlı Büyüme':'Moderate Growth'; buyumeCls = 'b-up'; }
  else if(c.growth > 0){ buyumeLabel = LANG==='tr'?'Yavaş Büyüme':'Slow Growth'; buyumeCls = 'b-neu'; }
  else { buyumeLabel = LANG==='tr'?'Küçülme':'Contraction'; buyumeCls = 'b-down'; }

  let borcLabel, borcCls;
  if(debtRatio < 0.3){ borcLabel = LANG==='tr'?'Düşük Borç':'Low Debt'; borcCls = 'b-up'; }
  else if(debtRatio < 0.7){ borcLabel = LANG==='tr'?'Orta Borç':'Moderate Debt'; borcCls = 'b-warn'; }
  else { borcLabel = LANG==='tr'?'Yüksek Borç':'High Debt'; borcCls = 'b-down'; }

  let tekLabel, tekCls;
  const m = c.momentum || 0;
  if(m > 0.008){ tekLabel = LANG==='tr'?'Yükseliş Eğilimi':'Uptrend'; tekCls = 'b-up'; }
  else if(m < -0.008){ tekLabel = LANG==='tr'?'Düşüş Eğilimi':'Downtrend'; tekCls = 'b-down'; }
  else { tekLabel = LANG==='tr'?'Yatay Seyir':'Sideways'; tekCls = 'b-neu'; }

  const yorumlar = [];
  if(LANG==='tr'){
    if(c.risk > 65) yorumlar.push('Oynaklık yüksek — fiyat ani hareket edebilir.');
    if(c.risk < 35) yorumlar.push('Oynaklık düşük — daha stabil bir seyir beklenebilir.');
    if(pe !== null && pe < sektorPE*0.7) yorumlar.push('Sektörüne kıyasla değerlemesi düşük görünüyor.');
    if(pe !== null && pe > sektorPE*1.3) yorumlar.push('Fiyatı sektör ortalamasının belirgin üzerinde.');
    if(c.growth > 15) yorumlar.push('Şirket hızlı büyüyor — talep güçlü görünüyor.');
    if(c.growth < 0) yorumlar.push('Şirket küçülüyor — dikkatli izlenmeli.');
    if(debtRatio > 0.8) yorumlar.push('Borçluluk yüksek, faiz artışlarına duyarlı.');
    if(c.cash > c.revenue * 0.25) yorumlar.push('Güçlü nakit pozisyonu var.');
    if(c.newsImpact > 0.03) yorumlar.push('Son haberler fiyat üzerinde olumlu etki yaratıyor.');
    if(c.newsImpact < -0.03) yorumlar.push('Son haberler fiyat üzerinde baskı kuruyor.');
    if(c.profitMargin < 0) yorumlar.push('Şirket zarar ediyor, temel göstergeler zayıf.');
    if(c.profitMargin > 20) yorumlar.push('Kâr marjı yüksek — operasyonel verimlilik güçlü.');
    if(yorumlar.length === 0) yorumlar.push('Belirgin bir sinyal yok; nötr görünüm.');
    if(c.country !== 'TR') yorumlar.push('Global şirket — kur ve jeopolitik etkilere açık.');
  } else {
    if(c.risk > 65) yorumlar.push('Volatility is high — price may move sharply.');
    if(c.risk < 35) yorumlar.push('Volatility is low — a more stable trend may be expected.');
    if(pe !== null && pe < sektorPE*0.7) yorumlar.push('Valuation looks low compared to its sector.');
    if(pe !== null && pe > sektorPE*1.3) yorumlar.push('Price is well above the sector average.');
    if(c.growth > 15) yorumlar.push('Company is growing fast — demand looks strong.');
    if(c.growth < 0) yorumlar.push('Company is contracting — should be watched carefully.');
    if(debtRatio > 0.8) yorumlar.push('Debt level is high, sensitive to rate hikes.');
    if(c.cash > c.revenue * 0.25) yorumlar.push('Strong cash position.');
    if(c.newsImpact > 0.03) yorumlar.push('Recent news is having a positive effect on price.');
    if(c.newsImpact < -0.03) yorumlar.push('Recent news is pressuring the price.');
    if(c.profitMargin < 0) yorumlar.push('Company is unprofitable, fundamentals weak.');
    if(c.profitMargin > 20) yorumlar.push('High profit margin — strong operational efficiency.');
    if(yorumlar.length === 0) yorumlar.push('No clear signal; neutral view.');
    if(c.country !== 'TR') yorumlar.push('Global company — exposed to FX and geopolitical effects.');
  }

  return { riskLabel, riskCls, valLabel, valCls, buyumeLabel, buyumeCls, borcLabel, borcCls, tekLabel, tekCls, yorumlar };
}

function renderCompanyModal(){
  const c = getCompany(state.ui.selected);
  if(!c){ closeModal(); return; }
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');

  const pos = state.player.positions[c.id];
  const owned = pos ? pos.shares : 0;
  const ort = pos && pos.shares ? pos.cost/pos.shares : 0;
  const pl = pos ? (owned * c.price - pos.cost) : 0;

  const hist = c.priceHistory;
  const closes = hist.map(h=>h.c);
  const ma20 = smaSeries(closes, 20);

  const araliklar = [
    { id:'1w', label:t('co.range1w'), gun:21 },
    { id:'1m', label:t('co.range1m'), gun:63 },
    { id:'3m', label:t('co.range3m'), gun:126 },
    { id:'1y', label:t('co.range1y'), gun:252 },
    { id:'all', label:t('co.rangeAll'), gun:99999 }
  ];
  const rangeBtns = araliklar.map(r=>{
    const disabled = hist.length < Math.min(r.gun, 5) ? 'disabled' : '';
    return `<button class="${state.ui.range===r.id?'active':''}" data-range="${r.id}" ${disabled}>${r.label}</button>`;
  }).join('');

  const w52 = hist.slice(-252);
  let hi52 = 0, lo52 = Infinity;
  for(const h of w52){ if(h.h > hi52) hi52 = h.h; if(h.l < lo52) lo52 = h.l; }
  if(!isFinite(lo52)) lo52 = c.price;

  const pe = c.eps > 0.012 ? c.price/c.eps : null;
  const inWatch = state.watchlist.includes(c.id);
  const sonHaberler = [...c.newsLog].reverse().slice(0, 10);
  const op = buildExpertOpinion(c);

  const analizLvl = getEmployeeLevel('analiz_asistani');
  const veriLvl = getEmployeeLevel('veri_bilimci');

  let ekPanel = '';
  if(analizLvl >= 1){
    const kalanBil = c.nextEarnings - state.cycle;
    const kalanKar = c.nextDividend - state.cycle;
    ekPanel = `
      <div class="card" style="margin-bottom:14px">
        <h3>${t('co.analyst')} <span class="sub">${t('co.analystSub',{lvl:analizLvl})}</span></h3>
        <div class="tiny muted" style="line-height:2">
          <div class="row" style="justify-content:space-between"><span>${t('co.upcomingEarn')}</span><span class="num">${kalanBil > 0 ? t('co.inNDays',{n:kalanBil}) : t('co.now')}</span></div>
          <div class="row" style="justify-content:space-between"><span>${t('co.upcomingDiv')}</span><span class="num">${kalanKar > 0 ? t('co.inNDays',{n:kalanKar}) : t('co.now')}</span></div>
        </div>
    `;
    if(analizLvl >= 2){
      const sektorSirketler = state.companies.filter(x=> x.alive && x.sector === c.sector && x.id !== c.id);
      const ortPE = sektorSirketler.length ? sektorSirketler.reduce((a,x)=> a + (x.eps > 0.012 ? x.price/x.eps : 0), 0)/sektorSirketler.length : 0;
      const ortMarj = sektorSirketler.length ? sektorSirketler.reduce((a,x)=> a + x.profitMargin, 0)/sektorSirketler.length : 0;
      ekPanel += `
        <div style="margin-top:10px;padding-top:10px;border-top:1px solid #131b26">
          <div class="tiny dim" style="margin-bottom:6px;letter-spacing:.08em;font-weight:800">${t('co.sectorComp')}</div>
          <div class="tiny muted" style="line-height:2">
            <div class="row" style="justify-content:space-between"><span>${t('co.pe')}</span><span class="num">${pe === null ? '—' : pe.toFixed(1)} <span class="dim">(${t('co.avg')} ${ortPE.toFixed(1)})</span></span></div>
            <div class="row" style="justify-content:space-between"><span>${LANG==='tr'?'Kâr Marjı':'Profit Margin'}</span><span class="num">${c.profitMargin.toFixed(1)}% <span class="dim">(${t('co.avg')} ${ortMarj.toFixed(1)}%)</span></span></div>
          </div>
        </div>
      `;
    }
    ekPanel += `</div>`;
  }

  if(veriLvl >= 1){
    let volLabel = t('co.volLow');
    let volColor = 'var(--up)';
    if(c.volatility > 0.030){ volLabel = t('co.volHigh'); volColor = 'var(--down)'; }
    else if(c.volatility > 0.018){ volLabel = t('co.volMid'); volColor = 'var(--warn)'; }
    const riskLabel = veriLvl >= 3 ? Math.round(c.risk) + '/100' : op.riskLabel;
    ekPanel += `
      <div class="card" style="margin-bottom:14px">
        <h3>${t('co.dataSci')} <span class="sub">${t('co.analystSub',{lvl:veriLvl})}</span></h3>
        <div class="tiny muted" style="line-height:2">
          <div class="row" style="justify-content:space-between"><span>${t('co.volLevel')}</span><span class="num" style="color:${volColor}">${volLabel}</span></div>
          <div class="row" style="justify-content:space-between"><span>${t('co.riskScore')}</span><span class="num">${riskLabel}</span></div>
          <div class="row" style="justify-content:space-between"><span>${t('co.beta')}</span><span class="num">${c.beta.toFixed(2)}</span></div>
        </div>
      </div>
    `;
  }

  modal.innerHTML = `
  <div class="modal-inner">
    <div class="modal-head">
      <div class="row" style="justify-content:space-between">
        <button class="back-btn" id="mBack">${t('co.back')}</button>
        <div class="row">
          <button id="mWatch">${inWatch ? t('co.watching') : t('co.watch')}</button>
        </div>
      </div>
      <div style="margin-top:14px">
        <div class="row" style="gap:12px">
          ${companyLogoHTML(c,44)}
          <div>
            <div class="row" style="gap:10px">
              <span style="font-size:20px;font-weight:800">${c.flag} ${esc(c.name)}</span>
            </div>
            <div class="row" style="gap:6px;margin-top:4px">
              <span class="badge b-acc">${esc(c.ticker)}</span>
              <span class="badge b-neu">${esc(c.sector)}</span>
              <span class="badge b-neu">${c.flag} ${esc(c.countryName||'')}</span>
              ${c.alive ? '' : `<span class="badge b-down">${t('co.iflas')}</span>`}
            </div>
          </div>
        </div>
        <div class="row" style="gap:14px;margin-top:9px">
          <span class="num" style="font-size:26px;font-weight:700">${c.price.toFixed(2)}</span>
          <span class="num ${cls(c.changePct)}" style="font-size:15px">${(c.price-c.prevClose).toFixed(2)} (${fmtPct(c.changePct)})</span>
        </div>
      </div>
    </div>
    <div class="modal-body">
      <div class="grid g4" style="margin-bottom:14px">
        ${hstat(t('co.marketCap'), fmtBig(c.marketCap))}
        ${hstat(t('co.pe'), pe === null ? '—' : pe.toFixed(1))}
        ${hstat(t('co.divYield'), c.dividendYield.toFixed(2)+'%')}
        ${hstat(t('co.range52'), lo52.toFixed(2) + ' – ' + hi52.toFixed(2))}
      </div>

      <div class="card" style="margin-bottom:14px">
        <div class="row" style="justify-content:space-between;margin-bottom:8px">
          <div class="range-btns">${rangeBtns}</div>
          <div class="tiny dim">MA20 <i style="display:inline-block;width:10px;height:3px;background:#f59e0b;border-radius:2px;vertical-align:middle;margin:0 4px"></i></div>
        </div>
        <div class="chart-wrap">
          <canvas class="chart" id="cMain" style="height:280px"></canvas>
          <div class="tooltip" id="cTip"></div>
        </div>
        <div class="chart-wrap" style="margin-top:2px"><canvas class="chart" id="cVol" style="height:56px"></canvas></div>
      </div>

      <div class="grid g2" style="margin-bottom:14px">
        <div class="card">
          <h3>${t('co.trade')}</h3>
          <div class="row" style="margin-bottom:8px">
            <input id="tQty" type="number" min="1" step="1" placeholder="${t('co.qty')}" style="flex:1;min-width:90px">
            <button id="tMaxBuy">${t('co.max')}</button>
          </div>
          <div class="row" style="margin-bottom:10px">
            <button class="buy" id="tBuy" style="flex:1">${t('co.buy')}</button>
            <button class="sell" id="tSell" style="flex:1">${t('co.sell')}</button>
          </div>
          <div class="row" style="margin-bottom:10px">
            <button data-pct="0.25">25%</button>
            <button data-pct="0.5">50%</button>
            <button data-pct="0.75">75%</button>
            <button data-pct="1">100%</button>
          </div>
          <div class="tiny muted" style="line-height:1.8">
            ${t('co.cash')}: <span class="num">${fmtCash(state.player.cash)}</span><br>
            ${t('co.maxBuy')}: <span class="num">${Math.floor(state.player.cash / (c.price*(1+getCommission()))).toLocaleString('en-US')}</span><br>
            ${t('co.owned')}: <span class="num">${owned.toLocaleString('en-US')}</span>
            ${owned ? `<br>${t('co.avgCost')}: <span class="num">${ort.toFixed(2)}</span> · ${t('port.pl')}: <span class="num ${cls(pl)}">${fmtCash(pl)}</span>` : ''}
            <br>${t('co.commission')}: <span class="num">${(getCommission()*100).toFixed(2)}%</span>
          </div>
        </div>

        <div class="card">
          <h3>${t('co.expert')} <span class="sub">${t('co.expertSub')}</span></h3>
          <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:12px">
            <span class="badge ${op.riskCls}">${op.riskLabel}</span>
            <span class="badge ${op.valCls}">${op.valLabel}</span>
            <span class="badge ${op.buyumeCls}">${op.buyumeLabel}</span>
            <span class="badge ${op.borcCls}">${op.borcLabel}</span>
            <span class="badge ${op.tekCls}">${op.tekLabel}</span>
          </div>
          <div class="tiny muted" style="line-height:1.75">
            ${op.yorumlar.map(y=>`• ${esc(y)}`).join('<br>')}
          </div>
          <p class="tiny dim" style="margin-top:12px;font-style:italic;border-top:1px solid #131b26;padding-top:10px">
            ${t('co.disclaimer')}
          </p>
        </div>
      </div>

      ${ekPanel}

      <div class="card">
        <h3>${t('co.companyNews')}</h3>
        <div class="scroll-y-sm">
          ${sonHaberler.length ? `<div class="timeline">${sonHaberler.map(n=>`
            <div class="tl-item ${n.tone>0?'pos':n.tone<0?'neg':''}">
              <div class="tl-day">${fmtTime(n.d*CONFIG.CYCLE_TICKS)}</div>
              <div>${esc(n.headline)}</div>
            </div>`).join('')}</div>` : `<div class="empty"><b>${t('co.noNews')}</b></div>`}
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById('mBack').onclick = closeModal;

  document.getElementById('mWatch').onclick = ()=>{
    if(state.watchlist.includes(c.id)){
      state.watchlist = state.watchlist.filter(x=>x !== c.id);
      toast(t('common.watchRemove'));
    } else {
      state.watchlist.push(c.id);
      toast(t('common.watchAdd'),'ok');
    }
    renderCompanyModal();
  };

  modal.querySelectorAll('[data-range]').forEach(b=>{
    b.onclick = ()=>{ state.ui.range = b.dataset.range; renderCompanyModal(); };
  });

  const qtyInput = document.getElementById('tQty');
  document.getElementById('tBuy').onclick = ()=>{
    const q = parseInt(qtyInput.value,10);
    if(buyShares(c.id, q)) renderCompanyModal();
  };
  document.getElementById('tSell').onclick = ()=>{
    const q = parseInt(qtyInput.value,10);
    if(sellShares(c.id, q)) renderCompanyModal();
  };
  document.getElementById('tMaxBuy').onclick = ()=>{
    const max = Math.floor(state.player.cash / (c.price*(1+getCommission())));
    qtyInput.value = Math.max(0, max);
  };
  modal.querySelectorAll('[data-pct]').forEach(b=>{
    b.onclick = ()=>{
      const p = parseFloat(b.dataset.pct);
      if(owned > 0){
        qtyInput.value = Math.max(1, Math.floor(owned*p));
      } else {
        const max = Math.floor(state.player.cash / (c.price*(1+getCommission())));
        qtyInput.value = Math.max(1, Math.floor(max*p));
      }
    };
  });

  const daysMap = { '1w':21,'1m':63,'3m':126,'1y':252,'all':99999 };
  const gun = daysMap[state.ui.range] || 63;
  const n = Math.min(hist.length, Math.max(2, gun));
  const slice = hist.slice(-n);
  const startIdx = hist.length - n;
  const maData = ma20.slice(startIdx);
  const maArr = [{ data: maData, color: '#f59e0b' }];

  const dayIndex = new Map(slice.map((h,i)=>[h.d, i]));
  const markers = [];
  for(const nl of c.newsLog){
    const i = dayIndex.get(nl.d);
    if(i !== undefined) markers.push({ i, tone: nl.tone, major: false });
  }

  drawCandles(document.getElementById('cMain'), slice, { ma: maArr, markers });
  drawVolume(document.getElementById('cVol'), slice);
  attachCandleTooltip(document.getElementById('cMain'), document.getElementById('cTip'), slice);
}

function hstat(label, value){
  return `<div class="hstat"><span class="lbl">${label}</span><span class="val">${value}</span></div>`;
}

function openNewsDetail(n){
  if(!n) return;
  const modal = document.getElementById('modal');
  modal.classList.remove('hidden');
  const { icon, badge, cls: badgeCls } = catInfo(n.cat);
  const toneLabel = n.tone > 0 ? t('newsDetail.positive') : (n.tone < 0 ? t('newsDetail.negative') : t('newsDetail.neutral'));
  const toneClass = n.tone > 0 ? 'b-up' : (n.tone < 0 ? 'b-down' : 'b-neu');
  const c = n.companyId ? getCompany(n.companyId) : null;

  modal.innerHTML = `
  <div class="modal-inner" style="max-width:640px">
    <div class="modal-head">
      <button class="back-btn" id="nBack">${t('co.back')}</button>
    </div>
    <div class="modal-body">
      <div class="row" style="gap:12px;margin-bottom:14px">
        <div class="news-icon" style="width:48px;height:48px;font-size:22px">${icon}</div>
        <div style="flex:1">
          <div class="row" style="gap:8px;margin-bottom:6px">
            <span class="news-badge ${badgeCls}">${badge}</span>
            <span class="badge ${toneClass}">${toneLabel}</span>
            ${n.major?`<span class="badge b-gold">${t('newsDetail.major')}</span>`:''}
          </div>
          <div class="tiny dim num">${fmtTime(n.d*CONFIG.CYCLE_TICKS)}${n.ticker ? ' · ' + (n.flag?n.flag+' ':'') + esc(n.ticker) : ''}</div>
        </div>
      </div>
      <h2 style="font-size:17px;font-weight:600;line-height:1.5;margin-bottom:16px">${esc(n.headline)}</h2>
      ${c ? `
      <div class="card" style="margin-bottom:12px">
        <h3>${t('newsDetail.related')}</h3>
        <div class="row" style="justify-content:space-between">
          <div class="row" style="gap:10px">
            ${companyLogoHTML(c,36)}
            <div>
              <div style="font-size:14px;font-weight:700">${c.flag} ${esc(c.name)}</div>
              <div class="tiny muted">${esc(c.ticker)} · ${esc(c.sector)} · ${esc(c.countryName||'')}</div>
            </div>
          </div>
          <div style="text-align:right">
            <div class="num" style="font-size:16px;font-weight:700">${c.price.toFixed(2)}</div>
            <div class="num ${cls(c.changePct)}" style="font-size:11.5px">${fmtPct(c.changePct)}</div>
          </div>
        </div>
        <div style="margin-top:12px">
          <button class="primary" id="nOpenCo">${t('newsDetail.inspect')}</button>
        </div>
      </div>` : ''}
      <p class="tiny dim" style="margin-top:14px">${t('newsDetail.note')}</p>
    </div>
  </div>`;

  document.getElementById('nBack').onclick = closeModal;
  if(c){
    document.getElementById('nOpenCo').onclick = ()=>{
      state.ui.selected = c.id;
      renderCompanyModal();
    };
  }
}

/* ---------------------- VIEW SWITCHING ---------------------- */
function setView(v){
  state.ui.view = v;
  document.querySelectorAll('.tab').forEach(t=> t.classList.toggle('active', t.dataset.view === v));
  document.querySelectorAll('.view').forEach(el=> el.classList.toggle('active', el.id === 'view-' + v));
  render();
}

function render(){
  renderHeader();
  renderTicker();
  updateNewsBadge();
  const v = state.ui.view;
  if(v === 'dashboard') renderDashboard();
  else if(v === 'market') renderMarket();
  else if(v === 'portfolio') renderPortfolio();
  else if(v === 'watchlist') renderWatchlist();
  else if(v === 'news') renderNews();
  else if(v === 'expert') renderExpert();
  else if(v === 'team') renderTeam();
  else if(v === 'stats') renderStats();
}

/* ========================= SAVE ================================= */
function saveGame(silent){
  try{
    const companies = state.companies.map(c=>({
      ...c,
      priceHistory: c.priceHistory.slice(-700),
      newsLog: c.newsLog.slice(-60),
      qProfits: c.qProfits.slice(-9)
    }));
    const save = {
      v: 6,
      tick: state.tick, cycle: state.cycle, seed: state.seed,
      nextCompanyId: state.nextCompanyId,
      usedTickers: state.usedTickers, usedNames: state.usedNames,
      economy: state.economy, sectors: state.sectors,
      companies, npcs: state.npcs,
      news: state.news.slice(0, 200),
      market: state.market,
      economyHistory: state.economyHistory.slice(-900),
      player: state.player, watchlist: state.watchlist,
      unreadNews: state.unreadNews || 0,
      newsViewedTick: state.newsViewedTick
    };
    localStorage.setItem(CONFIG.KAYIT_ANAHTARI, JSON.stringify(save));
    if(!silent) toast(t('common.toastSaved'), 'ok');
    return true;
  }catch(err){
    console.error(err);
    if(!silent) toast(t('common.toastSaveErr'), 'err');
    return false;
  }
}

function loadGame(silent){
  try{
    const raw = localStorage.getItem(CONFIG.KAYIT_ANAHTARI);
    if(!raw) return false;
    const s = JSON.parse(raw);
    state = s;
    RNG = mulberry32(state.seed + state.cycle);
    if(!state.ui) state.ui = defaultUI();
    if(!state.ui.countryFilter) state.ui.countryFilter = '__all__';
    if(!state.ui.sectorFilter) state.ui.sectorFilter = '__all__';
    if(!state.player.employees) state.player.employees = defaultEmployees();
    if(!state.tick) state.tick = state.cycle * CONFIG.CYCLE_TICKS;
    if(state.unreadNews === undefined) state.unreadNews = 0;
    const e = state.economy || {};
    if(e.policyRate === undefined) e.policyRate = 0;
    if(e.qeActive === undefined) e.qeActive = false;
    if(e.taxRate === undefined) e.taxRate = 22;
    if(e.regulationLevel === undefined) e.regulationLevel = 50;
    state.economy = e;
    hideLanding();
    return true;
  }catch(err){
    console.error(err);
    if(!silent) toast(t('common.toastLoadErr'), 'err');
    return false;
  }
}

function defaultUI(){
  return {
    view:'dashboard', selected:null, range:'1m',
    marketSort:{ key:'marketCap', dir:-1 }, marketFilter:'',
    sectorFilter:'__all__', countryFilter:'__all__',
    newsFilter:'all'
  };
}

/* =================== LIVE TIMER ========================= */
let microTimer = null;
let cycleAccum = 0;

function startLive(){
  if(microTimer) clearInterval(microTimer);
  cycleAccum = 0;
  microTimer = setInterval(()=>{
    if(!state) return;
    state.tick++;
    microTickPrice();
    if(state.tick % 3 === 0){
      renderHeader();
      renderTicker();
    }
    cycleAccum++;
    if(cycleAccum >= CONFIG.CYCLE_TICKS){
      cycleAccum = 0;
      cycleTick();
    }
  }, CONFIG.TICK_MS);
}

function cycleTick(){
  state.cycle++;
  updateEconomy();
  updateSectors();
  updateCompanies();
  processQuarters();
  generateNews();
  runNPCs();
  cycleCommitPrices();
  decayNews();
  pushEconomyHistory();
  updatePortfolioHistory();
  checkAchievements();
  saveGame(true);
  if(!state.ui.selected){
    render();
  } else {
    renderHeader();
    renderTicker();
  }
}

/* ============================ INIT ============================ */
function hideLanding(){
  const el = document.getElementById('landingContent');
  if(el) el.style.display = 'none';
  const wc = document.getElementById('welcomeCard');
  if(wc) wc.style.display = 'none';
  const seo = document.getElementById('seoIntro');
  if(seo) seo.style.display = 'none';
}

function startNewGame(seed){
  seed = seed || (Date.now() >>> 0);
  hideLanding();
  RNG = mulberry32(seed);
  state = {
    tick: 0, cycle: 0, seed, nextCompanyId: 1,
    usedTickers: [], usedNames: [],
    economy: null, sectors: {}, companies: [], npcs: [],
    news: [], economyHistory: [],
    unreadNews: 0, newsViewedTick: 0,
    market: { index: 1000, indexHistory: [{ d:0, value:1000 }], regime:'side' },
    player: {
      cash: CONFIG.BASLANGIC_NAKIT,
      positions: {},
      employees: defaultEmployees(),
      portfolioHistory: [{ d:0, value: CONFIG.BASLANGIC_NAKIT }],
      stats: { islemSayisi:0, temettuler:0, realized:0, enIyiIslem:null, enKotuIslem:null, enYuksekDeger:CONFIG.BASLANGIC_NAKIT, maxDusus:0 },
      achievements: []
    },
    watchlist: [],
    ui: defaultUI()
  };
  initEconomy();
  for(const s of SEKTOR_ADLARI){
    state.sectors[s] = { duygu: clamp(rrange(35,66), 2, 98), momentum: 0 };
  }
  initCompanies();
  initNPCs();
  pushEconomyHistory();
  checkAchievements();
  render();
  saveGame(true);
  startLive();
}

/* ---------------------- EVENT BINDING ---------------------- */
function bindLangSwitch(){
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.onclick = ()=> setLang(b.dataset.lang);
  });
}

function initWelcome(){
  const welcome = document.getElementById('welcomeCard');
  const startBtn = document.getElementById('btnStartGame');
  const loadBtn = document.getElementById('btnLoadSaved');
  if(!welcome || !startBtn) return;

  if(!localStorage.getItem(CONFIG.KAYIT_ANAHTARI)){
    if(loadBtn) loadBtn.disabled = true;
  }

  startBtn.onclick = ()=>{
    if(localStorage.getItem(CONFIG.KAYIT_ANAHTARI)){
      if(!confirm(t('common.confirmNew'))) return;
    }
    hideLanding();
    startNewGame();
    toast(t('common.toastNewGame'), 'ok');
  };

  if(loadBtn){
    loadBtn.onclick = ()=>{
      if(loadGame()){
        hideLanding();
        render();
        startLive();
        toast(t('common.toastLoaded'), 'ok');
      } else {
        toast(t('common.toastNoSave'), 'warn');
        hideLanding();
        startNewGame();
      }
    };
  }
}

document.getElementById('btnSave').onclick = ()=> saveGame();
document.getElementById('btnNew').onclick = ()=>{
  if(confirm(t('common.confirmNew'))){
    closeModal();
    startNewGame();
    toast(t('common.toastNewGame'),'ok');
  }
};

document.querySelectorAll('.tab').forEach(t=>{
  if(t.dataset.view){
    t.onclick = ()=> setView(t.dataset.view);
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

window.addEventListener('resize', ()=>{
  clearTimeout(window.__rt);
  window.__rt = setTimeout(()=>{ if(state) render(); }, 180);
});

window.openCompany = openCompany;

/* ---------------------- BOOT ---------------------- */
LANG = detectLang();
applyTranslations();
bindLangSwitch();
initWelcome();

/* ---------------------- TOOLTIP ATTACHMENT ---------------------- */
function attachCandleTooltip(cv, tip, candles){
  if(!cv || !tip) return;
  const old = cv._onMove;
  if(old){ cv.removeEventListener('mousemove', old); cv.removeEventListener('mouseleave', cv._onLeave); }
  cv._onMove = function(ev){
    const rect = cv.getBoundingClientRect();
    const mx = ev.clientX - rect.left;
    const meta = cv._meta;
    if(!meta){ return; }
    const n = meta.n;
    let idx = Math.round((mx - meta.padL) / (meta.cw/n) - 0.5);
    idx = Math.max(0, Math.min(n-1, idx));
    const d = meta.candles[idx];
    if(!d){ tip.classList.remove('on'); return; }
    const chg = d.o ? ((d.c - d.o)/d.o)*100 : 0;
    const chgCls = chg>0?'up':(chg<0?'down':'flat');
    const L = {
      open: LANG==='tr'?'Açılış':'Open',
      high: LANG==='tr'?'Yüksek':'High',
      low: LANG==='tr'?'Düşük':'Low',
      close: LANG==='tr'?'Kapanış':'Close',
      vol: LANG==='tr'?'Hacim':'Volume'
    };
    tip.innerHTML = `<div class="tt-h">${fmtTime(d.d * CONFIG.CYCLE_TICKS)}</div>
      <div class="tt-r"><span>${L.open}</span><span>${d.o.toFixed(2)}</span></div>
      <div class="tt-r"><span>${L.high}</span><span>${d.h.toFixed(2)}</span></div>
      <div class="tt-r"><span>${L.low}</span><span>${d.l.toFixed(2)}</span></div>
      <div class="tt-r"><span>${L.close}</span><span class="${chgCls}">${d.c.toFixed(2)} (${chg>0?'+':''}${chg.toFixed(2)}%)</span></div>
      <div class="tt-r"><span>${L.vol}</span><span>${(d.v||0).toLocaleString('en-US')}</span></div>`;
    const x = meta.X(idx);
    let left = x + 12;
    if(left > rect.width - 160) left = x - 160;
    tip.style.left = left + 'px';
    tip.style.top = '12px';
    tip.classList.add('on');
  };
  cv._onLeave = function(){ tip.classList.remove('on'); };
  cv.addEventListener('mousemove', cv._onMove);
  cv.addEventListener('mouseleave', cv._onLeave);
}

function attachLineTooltip(cv, tip, points, fmt){
  if(!cv || !tip) return;
  const old = cv._onMove;
  if(old){ cv.removeEventListener('mousemove', old); cv.removeEventListener('mouseleave', cv._onLeave); }
  cv._onMove = function(ev){
    const rect = cv.getBoundingClientRect();
    const meta = cv._lineMeta;
    if(!meta){ return; }
    const mx = ev.clientX - rect.left;
    let idx = Math.round(((mx - meta.padL) / meta.cw) * (meta.points.length-1));
    idx = Math.max(0, Math.min(meta.points.length-1, idx));
    const p = meta.points[idx];
    if(!p){ tip.classList.remove('on'); return; }
    tip.innerHTML = `<div class="tt-h">${fmtTime(p.x * CONFIG.CYCLE_TICKS)}</div>
      <div class="tt-r"><span>${LANG==='tr'?'Değer':'Value'}</span><span>${fmt(p.y)}</span></div>`;
    const x = meta.X(idx);
    let left = x + 12;
    if(left > rect.width - 140) left = x - 140;
    tip.style.left = left + 'px';
    tip.style.top = '12px';
    tip.classList.add('on');
  };
  cv._onLeave = function(){ tip.classList.remove('on'); };
  cv.addEventListener('mousemove', cv._onMove);
  cv.addEventListener('mouseleave', cv._onLeave);
}