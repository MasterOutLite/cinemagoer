import {CreateVideoCombineDto} from "@src/video/dto/create-video-combine.dto";
import {VideoCategory} from "@src/const/video-category";
import {Genre} from "@src/const/genre";
import {AgeRating} from "@src/const/age-ratings";
import {Type} from "@src/const/type";
import {Status} from "@src/const/status";
import {CreateSeasonDto} from "@src/season/dto/create-season.dto";
import {DayOfWeekEnum} from "@src/const/day-of-week-list";
import {SeasonOfYearEnum} from "@src/const/season-of-year-list";

export const anime: CreateVideoCombineDto[] = [
    {
        name: [
            'Фрірен, що проводжає в останню путь',
        ],
        description: 'Короля демонів переможено, і загін героїв-переможців повертається додому перед тим, як розійтися по домівках. Чотири маги - Фрірен, герой Гіммель, священик Хайтер і воїн Айзен - згадують про свою десятирічну подорож, коли настає момент прощання. Але для ельфів плин часу є іншим, тож Фрірен стає свідком того, як її супутники повільно відходять у вічність один за одним.\n' +
            '\n' +
            'Перед смертю Хайтер встигає нав\'язати Фрірен молоду людську ученицю на ім\'я Ферн. Захоплені пристрастю ельфа до колекціонування безлічі магічних заклинань, вони вирушають у, здавалося б, безцільну мандрівку, відвідуючи місця, де побували герої минулого. Під час мандрівки Фрірен поступово усвідомлює, що шкодує про втрачені можливості налагодити глибші зв\'язки зі своїми нині покійними товаришами.',
        videoCategoryId: VideoCategory.Anime,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Winter,
        genreIds: [Genre.Drama, Genre.Adventures, Genre.Fantasy, Genre.Shonen],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 1,
        pictures: [],
        trailers: [],
        icon: '1696887481_frieren_poster_big.jpg',
        duration: '~24 хв',
        countSeries: 12,
        mainCharacters: []
    },
    {
        name: [
            'Доктор Стоун 3: Новий світ (2 частина)'
        ],
        description: 'Продовження третього сезону.',
        videoCategoryId: VideoCategory.Anime,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Winter,
        genreIds: [Genre.Comedy, Genre.Adventures, Genre.Fantasy, Genre.Shonen],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 2,
        pictures: [],
        trailers: [],
        icon: '1697398837_stoun-noviy-svt-3-sezon-2-chastina.jpg',
        duration: '~24 хв',
        countSeries: 12,
        mainCharacters: []
    },
    {
        name: [
            'Магічна битва 2'
        ],
        description: 'Другий сезон "Магічної битви" охоплює події арок "Іскра Божа", "Згаслий пломінь" й "Шібуйський інцидент". Спочатку історія перенесе глядачів на 12 років назад, у часи буремної юності "Найсильнішого". От тільки неймовірний талант і високий титул ще не гарантують, що життя здаватиметься медом: як і будь-який підліток, Ґоджьо стикатиметься з непростими викликами, учитиметься розділяти емоції та обов\'язки, боротиметься з власним гонором і шукатиме відповідь на найголовніше запитання: "Ти найсильніший, бо ти Ґоджьо Сатору? Чи ти Ґоджьо Сатору, бо ти найсильніший?".\n' +
            'Шлях мага ніколи не буває простим, і учням Токійської магічної школи відомо про це, як нікому іншому. Ти або зламаєшся, або станеш сильнішим, третього не дано. От тільки що робити, коли привиди минулого знову стукають у двері, а старі рани починають кровити з новою силою? І чи може секундна слабкість обернути на попіл цілий світ?',
        videoCategoryId: VideoCategory.Anime,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Spring,
        genreIds: [Genre.Action, Genre.School, Genre.Fantasy, Genre.Shonen],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 13,
        pictures: [],
        icon: '1688704442_jjk_s2_done2.jpg',
        duration: '~24 хв',
        countSeries: 12,
        mainCharacters: []
    },
    {
        name: [
            'Заборонена дедукція Рона Камонохаші'
        ],
        description: 'Незважаючи на відсутність навичок, необхідних для роботи в слідчій групі Департаменту столичної поліції, Тотомару Ісшікі хоче розкривати вбивства та допомагати людям. Він наважується заручитися підтримкою Рона Камонохаші, генія дедукції, який п\'ять років тому після таємничого інциденту під час навчання покинув знамениту Академію BLUE.\n' +
            '\n' +
            'Тотомару очікує побачити приватного детектива у гарному костюмі, а натомість зустрічає розкуйовдженого відлюдника. Слово за слово, і розкутий ексцентрик Рон нарешті виходить за межі власного усамітнення, отримуючи можливість знову працювати. Проте, з умовою: саме Тотомару має робити вигляд, що розкриває справи.',
        videoCategoryId: VideoCategory.Anime,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Summer,
        genreIds: [Genre.Detective, Genre.Comedy, Genre.Shonen],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 14,
        icon: '7239b141b697f45559bce35346568e.jpg',
        duration: '~24 хв',
        mainCharacters: []
    },
    {
        name: [
            'Міґі і Далі'
        ],
        description: 'Лелека принесла ангела в життя бездітної пари середнього віку. Його батьки добрі, їхній будинок розкішний, а їжа смачна, але щоб продовжувати насолоджуватися цим щастям, Хіторі повинен приховати від рідних певний факт...',
        videoCategoryId: VideoCategory.Anime,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Fall,
        genreIds: [Genre.Mistica, Genre.Comedy],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 15,
        pictures: [],
        trailers: [],
        icon: '1696582899_poster.jpg',
        duration: '~24 хв',
        mainCharacters: []
    }
]

export const movie: CreateVideoCombineDto[] = [
    {
        name: [
            'Творець', 'The Creator',
        ],
        description: 'Створений людьми штучний інтелект у майбутньому допоміг людству впоратися з деякими проблемами, проте пізніше у програмі відбулися зміни, що призвело до жахливих наслідків. У центрі Лос-Анджелеса було підірвано ядерну бомбу. Після цього почалося жорстоке протистояння людей і роботів за ресурси, що залишилися. Якось агент Джошуа отримує важливе завдання: штучний інтелект розробив якусь таємну зброю, і тепер чоловікові треба знищити ці розробки. Герой вирушає у подорож і в результаті знаходить дівчинку-робота, яка поводиться як людина, проте може керувати будь-якими електронними системами. Джошуа розуміє, що вона несе небезпеку, і водночас не хоче її знищувати. Можливо, саме ця дівчинка допоможе герою та всьому людству зрозуміти справжній задум Творця, через який і повстали роботи?',
        videoCategoryId: VideoCategory.Movie,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Spring,
        genreIds: [Genre.Action, Genre.Melodrama, Genre.Adventures, Genre.Drama, Genre.Thriller, Genre.Fantastuka],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Movie,
        statusId: Status.ItComesOut,
        publisherId: 16,
        pictures: [],
        trailers: [],
        icon: 'Творець_фільм.jpg',
        duration: '133 хвилини (02:13)',
        mainCharacters: ['Джон Девід Вашинґтон', 'Madeleine Yuna Voyles', 'Джемма Чан', 'Еллісон Дженні', 'Кен Ватанабе', 'Sturgill Simpson']
    },
    {
        name: [
            'Поки смерть не розлучить нас', 'Til Death Do Us Part'
        ],
        description: 'Комедійний фільм жахів «Поки смерть не розлучить нас» представляє героїню, яка пізно усвідомила помилку. Спроба її виправити призвела до непередбачуваних наслідків. Напередодні власного весілля, вже одягнувшись у білу сукню, вона зрозуміла, що хлопець, що здавався підходящим кандидатом у чоловіки, насправді інша людина. Вирішивши відмовитися від урочистостей, вона просто поїхала додому, повідомивши про несподіване рішення телефоном. Реакція нареченого, виявилася шоковою. Традиції його сім\'ї не дозволяють прощати образ. Тут же зібравши компанію своїх приятелів, що тримали в страху всю округу, він помстився. Заміський особняк, що здавався надійним притулком від зазіхань, став місцем жорстоких випробувань для людей, які там живуть.\n' +
            'Навіть скривджений нареченою головоріз не очікував такої запопадливості від одного з вірних друзів. Вижити цієї ночі її родичам виявиться досить важко. Однак на них теж чекала несподіванка. У дівчині воістину прокинулися демони, що спали до певної пори. Важко сказати, кому виявиться страшніше у час, коли люди перетворюються на чудовиськ.',
        videoCategoryId: VideoCategory.Movie,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Winter,
        genreIds: [Genre.Action, Genre.Thriller, Genre.Horrors],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 17,
        pictures: [],
        trailers: [],
        icon: '0dfeb98a0210225102f971998845e2.jpg',
        duration: '109 хвилин (01:49)',
        mainCharacters: ['Кем Жиґанде', 'Джейсон Патрік', ' Наталі Берн', 'Орландо Джонс', 'СерДаріус Блейн', 'Панчо Молер']
    },
    {
        name: [
            'Чиста гра', 'Fair Play'
        ],
        description: 'Психологічний трилер досліджує несумісність тендітної мужності та кар\'єрної конкуренції через щоденні складні відносини молодої подружньої пари. Після невдалої спроби інтимної близькості у ванній кімнаті Люк натикається на незручну пропозицію своєї дівчини Емілі. Ці двоє таємно живуть разом і тримають особисті взаємини в секреті, тому що це суперечить політиці великої фінансової фірми, в якій обидва успішно працюють і числяться на доброму рахунку. Встаючи щоранку о пів на п\'яту і не залишаючи жодних натяків на взаємне кохання, парочка прямує в офіс різними шляхами, щоб ніхто не зміг їх вловити. Хлопець навіть не каже своїм батькам, що він заручений. План полягає в тому, щоб піднятися корпоративними сходами настільки, щоб стати фактично недоторканними авторитетами серед колег і майбутніх підлеглих. Після того, як менеджера проекту безжально звільняють, Люк думає, що отримає підвищення, але в результаті воно несподівано дістається його коханій. Коли в такий спосіб змінюється співвідношення сил, уражене самолюбство штовхає головного героя на руйнівний шлях.',
        videoCategoryId: VideoCategory.Movie,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Summer,
        genreIds: [Genre.Melodrama, Genre.Detective, Genre.Drama, Genre.Thriller],
        ageRatingId: AgeRating.R,
        typeId: Type.Movie,
        statusId: Status.ItComesOut,
        publisherId: 18,
        pictures: [
            '1699410657_mv5bowuxntg0owetyzmyos00njzhlwi4zgitnmzkndkxmmy0mtawxkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699410658_mv5bzjg2nzm3mwqtztuwoc00nmnhlwe2nzitowi5ymmyy2flnzhjxkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699410742_mv5bmdc3ntcwytutntgxzi00odjmltgymzitmmq1mwm3nja3oge2xkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699410745_mv5bnjg2njdmotctngy2zs00nta3ltg5zjmtzwjknjrkm2u1zgi5xkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
        ],
        icon: '2e8fe556b1462d5c2645ae25b7b2d9.jpg',
        duration: '113 хвилин (01:53)',
        mainCharacters: ['Фібі Дайневор', 'Олден Еренрайк', 'Едді Марсан', 'Річ Соммер', 'Себастьян де Соуса', 'Sia Alipour']
    },
    {
        name: [
            'Продавці болю', 'Pain Hustlers'
        ],
        description: 'Зіткнувшись із численними труднощами, Ліза змушена піти з коледжу та терміново шукати роботу. Їй вдається отримати невелику посаду у фармацевтичній компанії, яка перебуває на межі руйнування. Дівчині обіцяють найкращі умови, якщо вдасться покращити фінансові показники. Героїня самовіддано кидається в роботу, намагаючись бути корисною і сподіваючись на тривалу зайнятість на цьому місці. Незабаром Insys Therapeutics вдається позбутися загрози повного краху, випустивши інноваційний знеболюючий препарат. Обивателі скуповують ефективний засіб, не підозрюючи про його реальні наслідки. Тривалий прийом викликає звикання, різке припинення застосування призводить до ломки, а передозування несе смертельну загрозу. Журналіст відомого періодичного видання починає розслідувати таємничі смерті, пов\'язані із компанією. Він пише розгромну статтю, що викликає гучний скандал та численні судові розгляди.',
        videoCategoryId: VideoCategory.Movie,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Fall,
        genreIds: [Genre.Drama, Genre.Crime],
        ageRatingId: AgeRating.R,
        typeId: Type.Movie,
        statusId: Status.ItComesOut,
        publisherId: 19,
        pictures: [
            '1699409932_mv5bmdi1mzu3y2ytmmuymi00mtbilwjizmqtzgq5nwzhytflmtazxkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699409881_mv5bmgriymq3ngetmdy2mi00yzzklthmodmtnti4ngy3nme0zdc4xkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699409936_mv5bzgvlntnjmwetyjq4ns00ndrkltljogmtmta2otixmwm5nzvmxkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
            '1699409866_mv5bymizyzljnzgtnde0ys00m2i1ltlkotctnjk2ngm3mwmwnmi1xkeyxkfqcgdeqxvymtuzmtg2odkz__v1_.jpg',
        ],
        icon: '1699409899_1699409723_z6yfvtpk2uwh6lj6vl3thk052du.jpg',
        duration: '122 хвилини (02:02)',
        mainCharacters: ['Емілі Блант', 'Кріс Еванс', "Кетрін О'Гара", 'Енді Ґарсія', 'Джей Дюпласс', "Браян Джеймс Д'арсі"]
    },
    {
        name: [
            'Кілер на пів ставки', 'Les complices'
        ],
        description: 'Грізний кілер втрачає роботу через несподівану фобію – страх крові. Доброзичливі сусіди запрошують його до кол-центру, де відлюдькуватий найманець звикає до офісного життя, поки його не наздоганяє минуле. Французька чорна комедія з Франсуа Дамієнс. У ролі дружини кілера – Ванесса Параді.\n' +
            'Одного разу на завданні Макс втратив свідомість від одного виду крові. Для найманця вбивці це серйозна проблема. До того ж від нього йде дружина, зате в двері стукають добродушні сусіди - сімейна пара Карім і Стефані. Вони шкодують депресивного одинака, навіть не підозрюючи, з ким мають справу. З їхньою допомогою похмурий мізантроп Макс проходить співбесіду в офіс продажу. Як довго він зможе зберігати таємницю про свою попередню роботу? Не дуже довго – поки знову не візьметься за зброю.',
        videoCategoryId: VideoCategory.Movie,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Spring,
        genreIds: [Genre.Comedy],
        ageRatingId: AgeRating.SixteenPlus,
        typeId: Type.Movie,
        statusId: Status.ItComesOut,
        publisherId: 20,
        pictures: [
            '1699185642_mv5byje2m2fhytqtnza1mi00ntkyltkyotytymnmnmuymdnhntc0xkeyxkfqcgdeqxvymtyzmty3ote3__v1_.jpg',
            '1699185701_mv5bowvlyznioditmjy2ns00otrjltgwmdytm2m2n2ezndu3ytu2xkeyxkfqcgdeqxvymtyzmty3ote3__v1_.jpg',
            '1699185643_mv5bodq3zmrinzmtyjlhms00mjrjlweznwetm2y1zjq1owniztblxkeyxkfqcgdeqxvymtyzmty3ote3__v1_.jpg',
            '1699185716_mv5bmjlhmja0mditndfkyy00yzc5ltlhmdgtmtg4ngy4mgq4y2myxkeyxkfqcgdeqxvymtyzmty3ote3__v1_.jpg',
        ],
        icon: '1699185662_1699185599_6478437415e87.jpg',
        duration: '98 хвилин (01:38)',
        mainCharacters: ['Франсуа Даміенс', 'William Lebghil', 'Laura Felpin', 'Ванесса Параді', 'Бруно Подалідес', 'Lucile de la Morena']
    }
]

export const serials: CreateVideoCombineDto[] = [
    {
        name: [
            'Чудотворці', 'Miracle Workers'
        ],
        description: 'Бог утомився. Він дивиться телевізор і не думає про майбутнє Землі. Йому подобається, коли його вихваляють, особливо на телебаченні. Всевишній усвідомлює, що деякі люди приносять як йому, так і собі дуже багато проблем, що, звичайно ж, дуже напружує. Саме тому той приймає рішення будь-якою ціною покінчити з планетою. Два тижні – відведений термін життя Землі. Щоправда, з Богом укладає парі один із ангелів, який впевнений в тому, що зможе вирішити найскладніші молитви: їх накопичилася ціла скринька, тому доведеться діяти швидко. Заручившись підтримкою ще одного лінивого і боягузливого янголятка, головна героїня кидається на вирішення складних випадків, які часом ставлять героїв у глухий кут, змушуючи оцінити всі моральні "за" і "проти". Якщо любовні стосунки здаються нескладним завданням, то затримання і арешт небезпечного злочинця, що орудує дробовиком - це вже складніший випадок. На все про все у героїв два тижні, інакше світу кінець, а наприкінці ангелу доведеться ще поживитися огидним черв\'яком. Останнє – особисте бажання Бога у разі провалу місії амбітними янголятами.',
        videoCategoryId: VideoCategory.Serial,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Winter,
        genreIds: [Genre.Melodrama, Genre.Comedy],
        ageRatingId: AgeRating.PG13,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 20,
        pictures: [
            '1550038059-5.jpg',
            '1550038078-4.jpg',
            '1550038069-3.jpg',
            '1550038101-2.jpg',
        ],
        icon: '1691517303_33.jpg',
        duration: '~20 хв',
        series: {
            season: {
                name: '1',
                videoId: 0,
                number: 1,
            } as CreateSeasonDto,
            series: [
                {
                    name: '2 Weeks',
                    series: 1,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                },
                {
                    name: '13 Days',
                    series: 2,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                },
                {
                    name: '12 Days',
                    series: 3,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                },
                {
                    name: '6 Days',
                    series: 4,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                }, {
                    name: '3 Days',
                    series: 5,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                }, {
                    name: '1 Days',
                    series: 6,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                }, {
                    name: '1 Hour',
                    series: 7,
                    release: false,
                    dateRelease: new Date('2023'),
                    dayShowId: DayOfWeekEnum.Monday
                }
            ]
        },
        mainCharacters: ['Стів Бушемі', 'Деніел Редкліфф', 'Джеральдін Вісванатхан', 'Каран Соні', 'Саша Компере', 'Джон Басс', 'Лоллі Адефоп', 'Калеб Емері', "Тереза О’Ші"]
    },
    {
        name: [
            'Замкнуте коло', 'Full Circle'
        ],
        description: 'Сюжет серіалу бере свій початок із невдалого злочину, який чинить величезний вплив на людей, якимось чином пов\'язаних з ним. Дивовижні деталі розкриваються під час цієї справи: все починається в Нью-Йорку, а головними героями стають представники культурно-розважальної сфери. На перший погляд здається, що дійові особи зовсім не пов\'язані одні з одними, проте незабаром стає ясно, що перед загальною небезпекою їм необхідно об\'єднати зусилля і діяти спільно. Персонажі в критичних умовах розкриваються по-новому, реалізуючи себе з нової, неймовірної сторони. Грані власної особистості виявляються розширеними, через що тепер тонка нитка з натяків і недомовок починає сплітатися в загальний клубок подій, які так чи інакше підштовхують на відповіді на багато хвилюючих питань. Початок заплутаної детективної історії покладено, але лише найуважнішим, старанним і стійким належить розгадати таємницю минулого...',
        videoCategoryId: VideoCategory.Serial,
        dateRelease: new Date('2023-09-01'),
        seasonOfYearId: SeasonOfYearEnum.Summer,
        genreIds: [Genre.Detective, Genre.Drama, Genre.Crime],
        ageRatingId: AgeRating.SixteenPlus,
        typeId: Type.Serial,
        statusId: Status.ItComesOut,
        publisherId: 20,
        pictures: [
            '1689360937_1689360865_88.jpg',
            '1689360957_1689360885_55.jpg',
            '1689360896_1689360904_66.jpg',
            '1689360925_1689360871_77.jpg',
        ],
        icon: '1689360908_1689360668_stnblcywiurhvfio2vgttoc81xj.jpg',
        duration: '~20 хв',
        mainCharacters: [
            'Гаппі Андерсон', 'Phaldut Sharma', 'Gerald W. Jones III', 'Ethan Stoddard', 'Lucian Zanes', 'Kareem Savinon']
    }
];

const template = {
    name: [
        ''
    ],
    description: '',
    videoCategoryId: VideoCategory.Movie,
    dateRelease: new Date('2023-09-01'),
    genreIds: [Genre.Mistica, Genre.Comedy],
    ageRatingId: AgeRating.PG13,
    typeId: Type.Movie,
    statusId: Status.ItComesOut,
    publisherId: 15,
    pictures: [],
    trailers: [],
    icon: '',
    duration: '~24m',
    countSeries: 12,
    mainCharacters: []
}

