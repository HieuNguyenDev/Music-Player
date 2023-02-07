const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)

const app = {
    currentIndex: 0,
    songs: [
        {
          name: "Querry",
          singer: "QNT x TRUNG TRẦN ft RPT MCK",
          path: "../../assets/music/querry.mp3",
          image: "../../assets/img/querry.jpg",
        },
        {
          name: "Bộ tộc cùng già",
          singer: "Thiện Hưng",
          path: "../../assets/music/bo-toc-cung-gia.mp3",
          image: "../../assets/img/bo-toc-cung-gia.jpg",
        },
        {
          name: "Tình yêu bát cơm rang",
          singer: "Thiện Hưng",
          path: "../../assets/music/tinh-yeu-bat-com-rang.mp3",
          image: "../../assets/img/tinh-yeu-bat-com-rang.jpg",
        },
        {
          name: "Mong một ngày anh nhớ đến em",
          singer: "Huỳnh James x Pjnboys",
          path: "../../assets/music/mong-mot-ngay-em-nho-den-anh.mp3",
          image: "../../assets/img/mong-mot-ngay-em-nho-den-anh.jpg",
        },
        {
          name: "Mặt mộc",
          singer: "Phạm Nguyên Ngọc x VAnh",
          path: "../../assets/music/mat-moc.mp3",
          image: "../../assets/img/mat-moc.jpg",
        },
        {
          name: "Chìm sâu",
          singer: "MCK",
          path: "../../assets/music/chim-sau.mp3",
          image: "../../assets/img/chim-sau.jpg",
        },
        {
          name: "Cứ chill thôi",
          singer: "Chillies x Suni Hạ Linh x Rhymastic",
          path: "../../assets/music/mat-moc.mp3",
          image: "../../assets/img/mat-moc.jpg",
        },
        {
          name: "Muốn nói với em",
          singer: "Kiều Minh Tuấn x Lê Chi",
          path: "../../assets/music/muon-noi-voi-em.mp3",
          image: "../../assets/img/muon-noi-voi-em.jpg",
        },
        {
          name: "Thằng điên",
          singer: "JustaTee x Phương Ly",
          path: "../../assets/music/thang-dien.mp3",
          image: "../../assets/img/thang-dien.jpg",
        },
        {
          name: "Đã lỡ yêu em nhiều",
          singer: "JustaTee",
          path: "../../assets/music/da-lo-yeu-em-nhieu.mp3",
          image: "../../assets/img/da-lo-yeu-em-nhieu.jpg",
        },
    ],
    render() {
        const htmls = this.songs.map(song => {
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },
    defineProperties() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents() {
        const cd = $('.cd')
        const cdWidth = cd.offsetWidth

        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }
    },
    start() {
        this.render()
        this.defineProperties()
        this.handleEvents()
    }
}

app.start()