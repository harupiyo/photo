// ==========================================
// Photo Gallery Application
// ==========================================

class PhotoGallery {
    constructor() {
        this.photos = [];
        this.photoGrid = document.getElementById('photoGrid');
        this.loading = document.getElementById('loading');

        // Lightbox elements
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.lightboxTitle = document.getElementById('lightboxTitle');
        this.lightboxCounter = document.getElementById('lightboxCounter');

        // State
        this.currentPhotoIndex = 0;
        this.columns = [];
        this.columnCount = 1;

        this.init();
    }

    async init() {
        await this.loadPhotos();
        this.setupColumns();
        this.renderAll();
        this.setupEventListeners();
    }

    // Load photos from the images directory
    async loadPhotos() {
        // List of all photos in the images directory
        const photoFiles = [
            "dp3m0008_14812456827_o.jpg", "dp3m0011_14989749222_o.jpg", "dp3m0012_14812460657_o.jpg",
            "dp3m0018_14987012641_o.jpg", "dp3m0028_15048365569_o.jpg", "dp3m0032_49865395683_o.jpg",
            "dp3m0034_15234776022_o.jpg", "dp3m0039_14812297779_o.jpg", "dp3m0040_14990108025_o.jpg",
            "dp3m0040_15048586408_o.jpg", "dp3m0043_14812300399_o.jpg", "dp3m0045_14821573817_o.jpg",
            "dp3m0045_14990109465_o.jpg", "dp3m0049_14995914751_o.jpg", "dp3m0054_14976016936_o.jpg",
            "dp3m0057_15005006211_o.jpg", "dp3m0065_14803509508_o.jpg", "dp3m0076_14976024496_o.jpg",
            "dp3m0078_14967115636_o.jpg", "dp3m0083_14998636512_o.jpg", "dp3m0106_15232140461_o.jpg",
            "dp3m0107_15234856602_o.jpg", "dp3m0110_15212213606_o.jpg", "dp3m0111_15048662398_o.jpg",
            "dp3m0122_15048485039_o.jpg", "dp3m0138_15235293005_o.jpg", "dp3m0169_15048630220_o.jpg",
            "dp3m0291_15235338925_o.jpg", "dp3m0302_15235343045_o.jpg", "dp3m0315_15048659080_o.jpg",
            "dp3m0325_15048797477_o.jpg", "dp3m0355_15234955225_o.jpg", "dp3m0407_15048412727_o.jpg",
            "dp3m0416_15048415098_o.jpg", "dp3m0765_16192105561_o.jpg", "dp3m0769_16007914749_o.jpg",
            "dp3m0775_16168154336_o.jpg", "dp3m0796_15574395983_o.jpg", "dp3m0799_15574161863_o.jpg",
            "dp3m0812_16193177502_o.jpg", "dp3m0830_16006508128_o.jpg", "dp3m0839_16006637220_o.jpg",
            "dp3m0859_16193160762_o.jpg", "dp3m2312_45177865564_o.jpg", "dp3m2359_44988811155_o.jpg",
            "dp3m2369_45177700964_o.jpg", "dp3m2370_30962819057_o.jpg", "dp3m2374_30962818777_o.jpg",
            "dp3m2379_45177700854_o.jpg", "dp3m2384_31007757587_o.jpg", "dp3m2391_45177700694_o.jpg",
            "dp3m2397_30962818507_o.jpg", "dp3m2400_45177700424_o.jpg", "dp3m2403_45902886151_o.jpg",
            "dp3m2432_45220539764_o.jpg", "dp3m2445_45220540584_o.jpg", "img_20200131_082506_49530067393_o.jpg",
            "img_8246_10958642516_o.jpg", "img_8748_15212246166_o.jpg", "p_20180129_170410_44991959555_o.jpg",
            "pb030777_30962939847_o.jpg", "sdim0002_9646562686_o.jpg", "sdim0020_9646563750_o.jpg",
            "sdim0021_49443271701_o.jpg", "sdim0030_49442794328_o.jpg", "sdim0047_9646565482_o.jpg",
            "sdim0049_49443271436_o.jpg", "sdim0058_49443271271_o.jpg", "sdim0059_49442793978_o.jpg",
            "sdim0065_49443271076_o.jpg", "sdim0072_49443498417_o.jpg", "sdim0077_49442793753_o.jpg",
            "sdim0077_9643328097_o.jpg", "sdim0084_9778305905_o.jpg", "sdim0089_49442793688_o.jpg",
            "sdim0093_49443498097_o.jpg", "sdim0094_49443270691_o.jpg", "sdim0100_49442793518_o.jpg",
            "sdim0115_9778134012_o.jpg", "sdim0117_47793014381_o.jpg", "sdim0129_49442793363_o.jpg",
            "sdim0131_49442793283_o.jpg", "sdim0136_33916032048_o.jpg", "sdim0136_49443497767_o.jpg",
            "sdim0137_9778330476_o.jpg", "sdim0152_49529851923_o.jpg", "sdim0153_47793013641_o.jpg",
            "sdim0154_9778305304_o.jpg", "sdim0164_33916031608_o.jpg", "sdim0166_9778305784_o.jpg",
            "sdim0167_49529851153_o.jpg", "sdim0168_46876602565_o.jpg", "sdim0168_49530353281_o.jpg",
            "sdim0172_49530353206_o.jpg", "sdim0174_9778105791_o.jpg", "sdim0177_47793013341_o.jpg",
            "sdim0178_9778299945_o.jpg", "sdim0179_49529831873_o.jpg", "sdim0199_49546210893_o.jpg",
            "sdim0205_9778315926_o.jpg", "sdim0210_49546211583_o.jpg", "sdim0216-_49556925731_o.jpg",
            "sdim0216_7668504724_o.jpg", "sdim0220_7668503470_o.jpg", "sdim0222_49556427868_o.jpg",
            "sdim0223_15235370855_o.jpg", "sdim0228_10116298983_o.jpg", "sdim0240_15235005982_o.jpg",
            "sdim0241_10116129814_o.jpg", "sdim0248_49556428108_o.jpg", "sdim0256_10116206846_o.jpg",
            "sdim0256_49556428208_o.jpg", "sdim0266_49578134228_o.jpg", "sdim0268_10116108464_o.jpg",
            "sdim0274_46560344111_o.jpg", "sdim0274_49332624256_o.jpg", "sdim0281_44742824460_o.jpg",
            "sdim0286_49332624151_o.jpg", "sdim0287_49332160458_o.jpg", "sdim0291_46560343581_o.jpg",
            "sdim0295_49332624076_o.jpg", "sdim0297_10116098664_o.jpg", "sdim0303_49332160413_o.jpg",
            "sdim0306_10116244223_o.jpg", "sdim0308_10116080844_o.jpg", "sdim0314_49332623811_o.jpg",
            "sdim0317_10116237283_o.jpg", "sdim0323_49621058693_o.jpg", "sdim0324_49621574586_o.jpg",
            "sdim0326_49332161313_o.jpg", "sdim0337_31168437387_o.jpg", "sdim0342_49332161133_o.jpg",
            "sdim0344_32236501828_o.jpg", "sdim0348_49621844057_o.jpg", "sdim0362_31168437257_o.jpg",
            "sdim0364_49332160983_o.jpg", "sdim0365_49621574401_o.jpg", "sdim0372_31303190637_o.jpg",
            "sdim0373_10116152646_o.jpg", "sdim0377_44742821820_o.jpg", "sdim0379_46560341771_o.jpg",
            "sdim0380_49621574216_o.jpg", "sdim0389_49332160823_o.jpg", "sdim0390_46560341571_o.jpg",
            "sdim0391_44742820880_o.jpg", "sdim0396_10116096945_o.jpg", "sdim0406_10116036084_o.jpg",
            "sdim0413_10116122436_o.jpg", "sdim0416_10256868364_o.jpg", "sdim0417_10256962415_o.jpg",
            "sdim0418_46560341091_o.jpg", "sdim0429_49865930561_o.jpg", "sdim0431_10256847284_o.jpg",
            "sdim0432_49865930526_o.jpg", "sdim0433_49442793138_o.jpg", "sdim0434_49865930481_o.jpg",
            "sdim0435_49715773972_o.jpg", "sdim0435_49866243212_o.jpg", "sdim0437_10256942096_o.jpg",
            "sdim0437_49715457271_o.jpg", "sdim0446_49442793088_o.jpg", "sdim0447_10256939516_o.jpg",
            "sdim0456_49442793013_o.jpg", "sdim0463_10256832204_o.jpg", "sdim0465_49443497552_o.jpg",
            "sdim0480_10256922546_o.jpg", "sdim0485_49443497297_o.jpg", "sdim0504_10755851345_o.jpg",
            "sdim0514_10755940914_o.jpg", "sdim0519_10755940244_o.jpg", "sdim0522_10755939584_o.jpg",
            "sdim0531_10755937504_o.jpg", "sdim0555_10756136063_o.jpg", "sdim0665_10775789096_o.jpg",
            "sdim0669_10775747095_o.jpg", "sdim0678_7668502930_o.jpg", "sdim0720_7668501986_o.jpg",
            "sdim0740_10884050844_o.jpg", "sdim0744_10883932076_o.jpg", "sdim0752_10884047494_o.jpg",
            "sdim0759_7668500634_o.jpg", "sdim0802_7668499444_o.jpg", "sdim0822_10958627946_o.jpg",
            "sdim0826_10958773973_o.jpg", "sdim0827_10958628636_o.jpg", "sdim0831_15574174883_o.jpg",
            "sdim0837_16006659590_o.jpg", "sdim0839_16192108481_o.jpg", "sdim0851_10958727134_o.jpg",
            "sdim0866_11011280136_o.jpg", "sdim0881_11011195955_o.jpg", "sdim0918_16006532048_o.jpg",
            "sdim0926_16006665790_o.jpg", "sdim0956_11011595743_o.jpg", "sdim1207_7279833956_o.jpg",
            "sdim1376_15005780411_o.jpg", "sdim1544_7279831316_o.jpg", "sdim1583_14822166679_o.jpg",
            "sdim1588_7279842732_o.jpg", "sdim1616_7279846458_o.jpg", "sdim1646_15005782041_o.jpg",
            "sdim1749_14759671028_o.jpg", "sdim1759_14759673028_o.jpg", "sdim1768_7279848144_o.jpg",
            "sdim1802_14759744947_o.jpg", "sdim1836_7327084680_o.jpg", "sdim1850_14945944012_o.jpg",
            "sdim1877_14759628880_o.jpg", "sdim1891_7327084450_o.jpg", "sdim1919_7327083760_o.jpg",
            "sdim1924_7327083122_o.jpg", "sdim1983_7327085506_o.jpg", "sdim1986_7327085240_o.jpg",
            "sdim1993_7327085044_o.jpg", "sdim1996_7327083480_o.jpg", "sdim2014_14759664848_o.jpg",
            "sdim2031_7386999698_o.jpg", "sdim2218_7386999478_o.jpg", "sdim2233_7428996128_o.jpg",
            "sdim2298_7432284676_o.jpg", "sdim2392_7616119346_o.jpg", "sdim2473_7616121020_o.jpg",
            "sdim2493_7616110304_o.jpg", "sdim2558_7616111598_o.jpg", "sdim2593_7616095452_o.jpg",
            "sdim2631_7616107694_o.jpg", "sdim2633_7616108662_o.jpg", "sdim2647_7616095940_o.jpg",
            "sdim2672_7616101322_o.jpg", "sdim2726_7616104744_o.jpg", "sdim2755_7616105774_o.jpg",
            "sdim2789_7616073358_o.jpg", "sdim2812_7616068452_o.jpg", "sdim2850_7616074092_o.jpg",
            "sdim2855_7668483844_o.jpg", "sdim2893_7668480162_o.jpg", "sdim2902_7668477786_o.jpg",
            "sdim2917_7668476164_o.jpg", "sdim2962_7725283992_o.jpg", "sdim3050_7725289062_o.jpg",
            "sdim3071_7725288366_o.jpg", "sdim3135_7725290470_o.jpg", "sdim3268_7808540158_o.jpg",
            "sdim3272_7808536244_o.jpg", "sdim3294_7808542572_o.jpg", "sdim3305_7808536986_o.jpg",
            "sdim3818_8043273305_o.jpg", "sdim3905_8043284814_o.jpg", "sdim3914_8043274423_o.jpg",
            "sdim3943_8043274963_o.jpg", "sdim3967_8043285922_o.jpg", "sdim4089_8066603122_o.jpg",
            "sdim4113_8066603757_o.jpg", "sdim4127_8066604647_o.jpg", "sdim4129_8066604869_o.jpg",
            "sdim4150_8066606327_o.jpg", "sdim4155_8066606621_o.jpg", "sdim4158_8066607610_o.jpg",
            "sdim4220_8066608473_o.jpg", "sdim4221_8066608842_o.jpg", "sdim4225_8066610486_o.jpg",
            "sdim4252_8066668883_o.jpg", "sdim4279_8066612644_o.jpg", "sdim4290_8066601306_o.jpg",
            "sdim4350_8108659916_o.jpg", "sdim4392_8108660500_o.jpg", "sdim4414_8108661090_o.jpg",
            "sdim4415_8108654871_o.jpg", "sdim4421_8108655357_o.jpg", "sdim4462_8108656497_o.jpg",
            "sdim4469_8108656751_o.jpg", "sdim4488_8108665032_o.jpg", "sdim4498_8108664184_o.jpg",
            "sdim4534_8417106480_o.jpg", "sdim4683_8152589534_o.jpg", "sdim4707_8152564987_o.jpg",
            "sdim4739_8152565683_o.jpg", "sdim4753_8152566387_o.jpg", "sdim4780_8153363733_o.jpg",
            "sdim4790_8153391350_o.jpg", "sdim4883_8192274031_o.jpg", "sdim4897_8192274903_o.jpg",
            "sdim4915_8192275281_o.jpg", "sdim5008_8416009801_o.jpg", "sdim5027_8417105904_o.jpg",
            "sdim5158_8417105726_o.jpg", "sdim5161_8416009257_o.jpg", "sdim5183_8417105370_o.jpg",
            "sdim5193_8417105246_o.jpg", "sdim5201_8417105120_o.jpg", "sdim5227_8417105014_o.jpg",
            "sdim5355_8417104802_o.jpg", "sdim5472_8417104644_o.jpg", "sdim5477_8416008155_o.jpg",
            "sdim5534_8417104402_o.jpg", "sdim5653_8417104204_o.jpg", "sdim5666_8417103974_o.jpg",
            "sdim5668_8416007379_o.jpg", "sdim5679_8416007167_o.jpg", "sdim5683_8416006927_o.jpg",
            "sdim5739_8416006545_o.jpg", "sdim5778_8416005339_o.jpg", "sdim5781_8417101536_o.jpg",
            "sdim5905_8417396460_o.jpg", "sdim5924_8416301631_o.jpg", "sdim5930_8416301109_o.jpg",
            "sdim6063_8416300359_o.jpg", "sdim6120_8416300039_o.jpg", "sdim6140_8416299201_o.jpg",
            "sdim6285_8416246295_o.jpg", "sdim6352_8416298691_o.jpg", "sdim6438_8417392748_o.jpg",
            "sdim6446_8416297705_o.jpg", "sdim6458_8417390930_o.jpg", "sdim6462_8416296137_o.jpg",
            "sdim6521_8416295319_o.jpg", "sdim6532_8416295153_o.jpg", "sdim6561_8416294255_o.jpg",
            "sdim6570_8416293909_o.jpg", "sdim6584_8417386306_o.jpg", "sdim6601_8417385874_o.jpg",
            "sdim6618_8417383804_o.jpg", "sdim6706_8417376608_o.jpg", "sdim6712_8417376162_o.jpg",
            "sdim6750_8417375618_o.jpg", "sdim6862_8416278107_o.jpg", "sdim6965_8416275825_o.jpg",
            "sdim6969_8417369962_o.jpg", "sdim7022_8416273355_o.jpg", "sdim7037_8417367058_o.jpg",
            "sdim7070_8417366624_o.jpg", "sdim7089_8416271603_o.jpg", "sdim7122_8416270281_o.jpg",
            "sdim7152_8416269753_o.jpg", "sdim7168_8416267801_o.jpg", "sdim7176_8417362186_o.jpg",
            "sdim7177_8416266809_o.jpg", "sdim7229_8417357020_o.jpg", "sdim7273_8417356736_o.jpg",
            "sdim7336_8416261005_o.jpg", "sdim7414_8416246101_o.jpg", "sdim7427_8417354884_o.jpg",
            "sdim7449_8416257957_o.jpg", "sdim7478_8416255763_o.jpg", "sdim7485_8417350264_o.jpg",
            "sdim7593_8417348822_o.jpg", "sdim7597_8416253397_o.jpg", "sdim7598_8416253171_o.jpg",
            "sdim7620_8417345782_o.jpg", "sdim7631_8416250225_o.jpg", "sdim7635_8416249415_o.jpg",
            "sdim7636_8416248741_o.jpg", "sdim7661_8417341750_o.jpg", "sdim7807_8417101984_o.jpg",
            "sdim9745_9646569138_o.jpg", "sdim9747_9646570602_o.jpg", "sdim9790_9643336691_o.jpg",
            "sdim9932_9643341293_o.jpg", "sdim9971_9646582426_o.jpg", "sdim9989_9643344727_o.jpg",
            "slack_38422809472_o.png"
        ];

        this.photos = photoFiles.map((filename, index) => ({
            id: index,
            filename: filename,
            path: `images/${filename}`,
            title: this.formatTitle(filename)
        }));

        this.loading.classList.add('hidden'); // Hide loading spinner as we load all
    }

    // Determine number of columns based on window width
    getColumnsCount() {
        const width = window.innerWidth;
        if (width >= 1600) return 4;
        if (width >= 1200) return 3;
        if (width >= 768) return 2;
        return 1;
    }

    // Initialize columns
    setupColumns() {
        this.columnCount = this.getColumnsCount();
        this.photoGrid.innerHTML = '';
        this.columns = [];

        for (let i = 0; i < this.columnCount; i++) {
            const column = document.createElement('div');
            column.className = 'masonry-column';
            this.photoGrid.appendChild(column);
            this.columns.push(column);
        }
    }

    // Render all photos immediately
    renderAll() {
        if (!this.photos.length) return;

        // Distribute all photos to columns round-robin
        this.photos.forEach((photo, index) => {
            const card = this.createPhotoCard(photo, index);
            const colIndex = index % this.columnCount;
            this.columns[colIndex].appendChild(card);
        });
    }

    // Re-render all (e.g., on resize)
    reRenderAll() {
        this.setupColumns(); // Reset columns
        this.renderAll();    // Re-distribute
    }

    // Create photo card element
    createPhotoCard(photo, index) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.dataset.index = index;

        const img = document.createElement('img');
        img.dataset.src = photo.path; // Keep data-src if needed, but main src is key
        img.src = photo.path;
        img.alt = photo.title;
        img.loading = "lazy"; // Native lazy loading

        // Fade in when loaded
        img.onload = () => {
            img.classList.add('loaded');
        };

        // If image is cached, onload might not trigger, so check complete
        if (img.complete) {
            img.classList.add('loaded');
        }

        const overlay = document.createElement('div');
        overlay.className = 'photo-overlay';

        const title = document.createElement('h3');
        title.className = 'photo-title';
        title.textContent = photo.title;

        const filename = document.createElement('p');
        filename.className = 'photo-filename';
        filename.textContent = photo.filename;

        overlay.appendChild(title);
        overlay.appendChild(filename);
        card.appendChild(img);
        card.appendChild(overlay);

        card.addEventListener('click', () => this.openLightbox(index));

        return card;
    }

    // Setup format title (helper)
    formatTitle(filename) {
        return filename
            .replace(/\.[^/.]+$/, '') // Remove extension
            .replace(/_/g, ' ')
            .replace(/-/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    // Setup event listeners
    setupEventListeners() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newColCount = this.getColumnsCount();
                if (newColCount !== this.columnCount) {
                    this.reRenderAll();
                }
            }, 200);
        });

        // Lightbox close button
        document.querySelector('.lightbox-close').addEventListener('click', () => {
            this.closeLightbox();
        });

        // Zoom button
        const zoomButton = document.querySelector('.lightbox-zoom');
        zoomButton.addEventListener('click', () => {
            this.toggleZoom();
        });

        // Navigation buttons
        document.querySelector('.lightbox-prev').addEventListener('click', () => {
            this.navigatePhoto(-1);
        });

        document.querySelector('.lightbox-next').addEventListener('click', () => {
            this.navigatePhoto(1);
        });

        // Click outside to close
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;

            switch (e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.navigatePhoto(-1);
                    break;
                case 'ArrowRight':
                    this.navigatePhoto(1);
                    break;
                case 'z':
                case 'Z':
                    this.toggleZoom();
                    break;
            }
        });

        this.setupDragScroll();
    }

    // Setup drag to scroll functionality
    setupDragScroll() {
        const container = document.querySelector('.lightbox-image-container');
        const image = document.querySelector('.lightbox-image');

        let isDown = false;
        let startX;
        let startY;
        let scrollLeft;
        let scrollTop;

        // Prevent default image drag
        image.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });

        container.addEventListener('mousedown', (e) => {
            if (!container.classList.contains('zoomed')) return;
            isDown = true;
            container.classList.add('active');

            // Get initial mouse position
            startX = e.pageX - container.offsetLeft;
            startY = e.pageY - container.offsetTop;

            // Get initial scroll position
            scrollLeft = container.scrollLeft;
            scrollTop = container.scrollTop;

            // Change cursor
            container.style.cursor = 'grabbing';
        });

        const stopDrag = () => {
            if (!isDown) return;
            isDown = false;
            container.classList.remove('active');
            container.style.cursor = 'grab';
        };

        container.addEventListener('mouseleave', stopDrag);
        container.addEventListener('mouseup', stopDrag);

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();

            // Calculate distance moved
            const x = e.pageX - container.offsetLeft;
            const y = e.pageY - container.offsetTop;

            // 1:1 movement feels more natural than * 2
            const walkX = (x - startX);
            const walkY = (y - startY);

            // Update scroll position
            // Subtract walk because dragging left should move view right (scroll right)
            container.scrollLeft = scrollLeft - walkX;
            container.scrollTop = scrollTop - walkY;
        });
    }

    // Toggle zoom mode
    toggleZoom() {
        const container = document.querySelector('.lightbox-image-container');
        const zoomButton = document.querySelector('.lightbox-zoom');

        container.classList.toggle('zoomed');
        zoomButton.classList.toggle('active');

        // Reset scroll position when zooming out
        if (!container.classList.contains('zoomed')) {
            container.scrollLeft = 0;
            container.scrollTop = 0;
        }
    }


    // Open lightbox with photo
    openLightbox(index) {
        this.currentPhotoIndex = index;
        this.updateLightbox();
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = '';

        // Reset zoom state
        const container = document.querySelector('.lightbox-image-container');
        const zoomButton = document.querySelector('.lightbox-zoom');
        container.classList.remove('zoomed');
        zoomButton.classList.remove('active');
        container.scrollLeft = 0;
        container.scrollTop = 0;
    }

    // Navigate to next/previous photo
    navigatePhoto(direction) {
        this.currentPhotoIndex += direction;

        // Wrap around
        if (this.currentPhotoIndex < 0) {
            this.currentPhotoIndex = this.photos.length - 1;
        } else if (this.currentPhotoIndex >= this.photos.length) {
            this.currentPhotoIndex = 0;
        }

        this.updateLightbox();
    }

    // Update lightbox content
    updateLightbox() {
        const photo = this.photos[this.currentPhotoIndex];
        this.lightboxImage.src = photo.path;
        this.lightboxImage.alt = photo.title;
        this.lightboxTitle.textContent = photo.title;
        this.lightboxCounter.textContent = `${this.currentPhotoIndex + 1} / ${this.photos.length}`;
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
});
