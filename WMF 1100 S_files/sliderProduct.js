class DrawSlProduct {
    constructor(element) {
        this.e = element;

        // все для превьюшек
        this.wrPreviewEl = this.e.querySelector('.product-carousel');
        this.wrOfListPrev = this.e.querySelector('.producSL__slides-wrapper');
        this.listPrev = this.wrOfListPrev.children[0];
        this.previews = this.listPrev.children;
        this.arrows = [...this.e.querySelectorAll('.product__sl-arrow')];

        // все для большого слайда
        this.wrOfListBig = this.e.querySelector('.producSL__slides-wrapper_big');
        this.listImgBig = this.wrOfListBig.children[0];
        this.imagesBIg = null;
        this.imageBIg = null;
        
        // количество превьюшек (картинок)
        this.amountPrev = null;
        this.amountBigImg = null;

        // ширина превьюшек (картинок) и больших картинок
        this.widthPrev = null;
        this.widthImgBig = null;

        // продолжительность анимации и временная функция
        this.animDur = '0.3';
        this.tFunc = 'linear';

        // индекс текущего активного слайда
        this.currentBigImg = null;
        // индекс нового активного слайда
        this.newBigImg = null;

        // Активный, следующий и предидущий слайды
        this.activeSlide = null;
        this.nextSlide = null;
        this.previousSlide = null;

        // Для блокировки накликивания
        this.blocking = false;
    }

    // инициализируем слайдер
    initSlider() {


        this.amountPrev = this.previews.length;

        for(let i = 0; i < this.amountPrev; i += 1) {

            // создаем слайды для большого окна с картинкой
            const path = this.previews[i].children[0].src;
            const alt = this.previews[i].children[0].alt;
            const el = this.createBigSlide(path, alt);
            this.listImgBig.append(el);
        }

        if(this.amountPrev === 2) {
            this.wrPreviewEl.style.width = `66.6%`;
            this.wrPreviewEl.style.margin = '0';
            [...this.previews].forEach(item => item.style.width = `50%`);
        }

        // Определяем активные слайды
        // this.changeActiveSlides(
        //     this.previews[0],
        //     this.previews[1], 
        //     this.previews[this.amountPrev - 1]
        // )
        // Собираем данные о больших картинках
        this.imagesBIg = this.listImgBig.children;
        this.imageBIg = this.imagesBIg[0].children[0];
        this.amountBigImg = this.imagesBIg.length;

        // Скрываем стрелки если картинок 3 и менее
        if(this.amountPrev === 1) {
            this.arrows.forEach( item => item.style.display = 'none');
        }

        // Определяем порядковые номера слайдов
        this.changeDataNum();

        // индекс текщего активного слайда, при перелистывании
        // по стрелке происходит переопределение индексов, поэтому это всегда единица
        this.currentBigImg = +this.previews[0].dataset.numimg;
    }

    // показ большой картинки по выбранной маленькой
    choosePreview(el) {
        // если значения совпадают значит клик был по тому же элемнту
        if(this.newBigImg === +el.dataset.numimg) return;
  
        this.newBigImg = +el.dataset.numimg;
        // Вычисляем разницу между активным слайдом и выбранным и их модуль
        const i = Math.abs(this.newBigImg - +this.currentBigImg);
        this.widthImgBig = this.culcWidth(this.imageBIg);
        const offset = i * this.widthImgBig;

        // устанавливаем transition и сдвигаем
        setTimeout(() => {
            this.listImgBig.style = `transition: transform ${this.animDur}s ${this.tFunc};
            transform: translateX(-${offset}px); `;
        })
    }

    // двигаем превью вправо
    // Механизм: сначала сдвигаем потом переставляем первую в конец 
    // и переопределяем атрибуты
    nextPrev() {
        if(this.blocking) return;

        if(this.amountPrev > 3) {
            this.blocking = true;
        
            this.widthPrev = this.culcWidth(this.previews[0]);
    
            this.addTransition(this.listPrev, this.widthPrev, '-');
            this.deleteTransition(this.listPrev, 'next');
    
            // Сдвигаем большую картинку
            this.widthImgBig = this.culcWidth(this.imageBIg);
    
            this.addTransition(this.listImgBig, this.widthImgBig, '-');
            // условие так как навешиваются более одного слушателя
            // когда это не нужно (когда была выбрана конкрентная картинка
            // эта функция не нужна все выполняется в первой addTransition)
            if(this.newBigImg === null) {
                this.deleteTransition(this.listImgBig, 'next');
            }
            setTimeout(() => this.blocking = false, +this.animDur * 1000 + 100);
        }
        
        if(this.amountPrev <= 3 && this.amountPrev > 1) {
            // понимаем первый слайд выбран как активный или другой
            const i = this.newBigImg ?? this.currentBigImg;
            // элемент будем брать из коллекции и так как i на единицу больше 
            // чем индекс активного элемента в коллекции, то i и будет следующий элемент
            // только если активный элемент это крайний слайд, то i переопределяем
            const iEl = i === this.previews.length ? 0 : i;
            const el = this.previews[iEl];
            this.choosePreview(el);
        }
    }
    

    // двигаем превью влево
    // Механизм: сначала переставляем последнюю в начало потом сдвигаем
    // и переопределяем атрибуты
    prevPrev() {
        if(this.blocking) return;

        if(this.amountPrev > 3) {
            this.blocking = true;

            this.addTransition(this.listPrev, 0, '');
            this.deleteTransition(this.listPrev);
    
            // Сдвигаем большую картинку
            this.addTransition(this.listImgBig, 0, '');
            this.deleteTransition(this.listImgBig);
            
            
            setTimeout(() => this.blocking = false, +this.animDur * 1000 + 100);
        }
        
        if(this.amountPrev <= 3 && this.amountPrev > 1) {
            // понимаем первый слайд выбран как активный или другой
            const i = this.newBigImg ?? this.currentBigImg;
            // элемент будем брать из коллекции и так как i на единицу больше 
            // чем индекс активного элемента в коллекции, то i - 2 и будет предидущий элемент
            // только если активный элемент это крайний слайд, то i переопределяем
            const iEl = i === 1 ? this.previews.length - 1 : i - 2;
            const el = this.previews[iEl];
            this.choosePreview(el);
        }
    }

    // offset - величина сдвига
    // towards - направление сдвига, + или -
    addTransition(list, offset, towards) {
        // для сдвига по prev (подготовка позиции слайда перед сдвигом)
        if(towards !== '-') {
            
            const offset = this.culcWidth(list.children[0]);
            const el = list.children[list.children.length - 1];

            // Когда this.newBigImg !== null, значит был клик по какой то конкретной
            // картинке и перед тем как сдвинуть нужно подготовить слайдер
            // на нужный отступ чтоб подставить в начало нужную картинку
            if(this.newBigImg !== null) {
                list.style = `transform: translateX(-${offset * this.newBigImg}px);`;
            } else {
                list.style = `transform: translateX(-${offset}px);`;
            }
    
            list.prepend(el);
        }

        // устанавливаем transition и сдвигаем
        setTimeout(() => {
            // Когда выбрана конкретная картинка сдвиг будет только у превью, 
            //  анимация не произойдет потому что this.newBigImg не null
            // также при next сдвигается только на одну картинку, какая бы картинка
            //  2 или 3 ни была выбрана
            //  (такое условие в nextPrev)
            // Важно в выражении ниже в prevPrev !!!! offset === 0 !!!! элемент сдвигается на
            // нулевую позицию
            list.style = `transition: transform ${this.animDur}s ${this.tFunc};
            transform: translateX(${towards}${offset}px);`;

            // так как в большой картинке при активном втором слайде уже есть сдвиг
            // на один слайд то анимация не сработает и там перестановка слайда
            //  переставляем слайд здесь также метод с анимацией заблокирован если
            // this.newBigImg !== null (такое условие в nextPrev), тогда все становится на свои места
            if(this.newBigImg !== null && list.matches('.producSL__slides-list_big') && towards === '-') {
                // когда выбран второй слайд в превью, при клике next нужно сдвигать только слайдер с превью
                if(this.newBigImg === 2) list.style.transition = '';
                list.append(list.children[0]);
                list.style.transform = '';

                // изначально при выборе картинки в превью большой слайдер мы просто 
                // сдвигаем и не перерисовываем, поэтому при сдвиге слева остаются слайды
                // при клике next
                // так как при выбранной 2й картинке мы большой слайдер НЕ СДВИГАЕМ (это происходит 
                // из за того что если в this.newBigImg !== null функция анимации не будет вызвана в
                // nextPrev, а также потому что мы задаем if(this.newBigImg === 2)
                //  list.style.transition = ''; и transition поэтому не срабатывает), а превью
                // сдвигаем то и получается что все подстраивается, просто удаляется слайд слева
                // а при 3й выбранной картинке мы большой слайдер СДВИГАЕМ на один
                //  слайд и просто удаляем картинку слева
            }
        })
    }

    deleteTransition(list, params) {

        list.addEventListener('transitionend', () => {
            
            list.style.transition = '';

            // только для next
            if(params) {
                list.append(list.children[0]);
            };

            this.newBigImg = null;
            list.style.transform = '';

            // Сохраняем актуальный индекс активного изображения
            // только для превью
            // if(list.matches('.producSL__slides-list')) {
                // Определяем активные слайды (active nrxt prev)
            //     this.changeActiveSlides(
            //         list.children[0],
            //         list.children[1], 
            //         list.children[list.children.length - 1]
            //     );  
            // }

            // Определяем порядковые номера слайдов
            this.changeDataNum();
        }, {once: true})
    }

    // culcOffsetSlide(i) {
    //     return this.widthImgBig * Math.abs(this.currentBigImg - i);
    // }

    // расчет ширины слайда в моменте
    culcWidth(el) {
        return el.offsetWidth;
    }

    // changeActiveSlides(active, next, prev) {
    //     if(this.activeSlide && this.nextSlide && this.previousSlide) {
    //         this.activeSlide.classList.remove('activePrev')
    //         this.nextSlide.classList.remove('nextPrev')
    //         this.previousSlide.classList.remove('previousPrev')
    //     }
        
    //     this.activeSlide = active;
    //     this.nextSlide = next;
    //     this.previousSlide = prev;
        
    //     this.activeSlide.classList.add('activePrev');
    //     this.nextSlide.classList.add('nextPrev');
    //     this.previousSlide.classList.add('previousPrev');
    // }

    changeDataNum() {
        for(let i = 0; i < this.amountPrev; i += 1) {
            // добавляем порядковые номера слайдам превью
            this.previews[i].dataset.numimg = i +  1;

            // создаем слайды для большого окна с картинкой
            this.imagesBIg[i].dataset.numimg = i +  1;
        }
    }

    // конструктор слайда для большой картинки
    createBigSlide(path, alt) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('swiper-slide');
        wrapper.classList.add('productSl_slide_big');

        const image = document.createElement('img');
        image.classList.add('product-slider-img_big');
        image.src = path;
        image.alt = alt;

        wrapper.append(image);

        return wrapper;
    }
}

class ControllSlProduct {
    constructor(draw) {
        this.dr = draw;

        this.click = this.click.bind(this);
    }

    init() {
        this.dr.initSlider();

        this.registerEvents();
    }

    registerEvents() {
        this.dr.wrOfListPrev.addEventListener('click', this.click);
        this.dr.arrows.forEach( item => item.addEventListener('click', this.click));
    }

    click(e) {
        if(e.target.closest('.swiper-button-next')) {
            this.dr.nextPrev();
        }

        if(e.target.closest('.swiper-button-prev')) {
            this.dr.prevPrev();
        }

        // if(e.target.closest('.productSl_slide')) {
        //     this.dr.choosePreview(e.target.closest('.productSl_slide'));
        // }
    }
}

function istSliderStart() {
    const el = document.querySelector('.slider-prod-card');

    if(el) {
        const drawSlProduct = new DrawSlProduct(el);
        const controllSlProduct = new ControllSlProduct(drawSlProduct);
        controllSlProduct.init();
    }
}

// BX.addCustomEvent('onAjaxSuccess', function () {
//     istSliderStart();
// });

document.addEventListener("DOMContentLoaded", function() {  
    istSliderStart();
});