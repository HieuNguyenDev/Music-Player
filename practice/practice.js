const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')

const app = {
  currentIndexSong: 0,
  isPlaying: false,
  isRandom: false,
  songs: [
    {
      name: "Querry",
      singer: "QNT x TRUNG TRẦN ft RPT MCK",
      path: "querry.mp3",
      image: "querry.jpg",
    },
    {
      name: "Bộ tộc cùng già",
      singer: "Thiện Hưng",
      path: "bo-toc-cung-gia.mp3",
      image: "bo-toc-cung-gia.jpg",
    },
    {
      name: "Tình yêu bát cơm rang",
      singer: "Thiện Hưng",
      path: "tinh-yeu-bat-com-rang.mp3",
      image: "tinh-yeu-bat-com-rang.jpg",
    },
    {
      name: "Mong một ngày anh nhớ đến em",
      singer: "Huỳnh James x Pjnboys",
      path: "mong-mot-ngay-em-nho-den-anh.mp3",
      image: "mong-mot-ngay-em-nho-den-anh.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Phạm Nguyên Ngọc x VAnh",
      path: "mat-moc.mp3",
      image: "mat-moc.jpg",
    },
    {
      name: "Chìm sâu",
      singer: "MCK",
      path: "chim-sau.mp3",
      image: "chim-sau.jpg",
    },
    {
      name: "Cứ chill thôi",
      singer: "Chillies x Suni Hạ Linh x Rhymastic",
      path: "mat-moc.mp3",
      image: "mat-moc.jpg",
    },
    {
      name: "Muốn nói với em",
      singer: "Kiều Minh Tuấn x Lê Chi",
      path: "muon-noi-voi-em.mp3",
      image: "muon-noi-voi-em.jpg",
    },
    {
      name: "Thằng điên",
      singer: "JustaTee x Phương Ly",
      path: "thang-dien.mp3",
      image: "thang-dien.jpg",
    },
    {
      name: "Đã lỡ yêu em nhiều",
      singer: "JustaTee",
      path: "da-lo-yeu-em-nhieu.mp3",
      image: "da-lo-yeu-em-nhieu.jpg",
    },
  ],
  defineProperties() {
    Object.defineProperty(this, 'currentSong', {
      get() {
        return this.songs[this.currentIndexSong]
      }
    })
  },
  handleEvents() {  
    const _this = this
    const cdWidth = cd.offsetWidth
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const newCdWidth = cdWidth - scrollTop

      cd.style.width = newCdWidth < 0 ? 0 : newCdWidth + 'px'
      cd.style.opacity = newCdWidth / cdWidth
    }

    playBtn.onclick = () => {
      _this.isPlaying = !_this.isPlaying
      _this.isPlaying ? audio.play() : audio.pause()
    }

    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) 
        progress.value = progressPercent
      }
    }

    progress.onchange = (e) => {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }

    nextBtn.onclick = () => {
      _this.isRandom ? _this.randomSong() : _this.nextSong()
      audio.play()
    }

    prevBtn.onclick = () => {
      _this.isRandom ? _this.randomSong() : _this.prevSong()
      audio.play()
    }

    randomBtn.onclick = () => {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('active', _this.isRandom)
    }

    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity
    })
    cdThumbAnimate.pause()

    audio.onplay = () => {
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    audio.onpause = () => {
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name.toUpperCase()
    cdThumb.style.backgroundImage = `url(../assets/img/${this.currentSong.image})`
    audio.src = `../assets/music/${this.currentSong.path}`
  },
  render() {
    const htmls = this.songs.map(song => {
      return `
        <div class="song">
          <div class="thumb" style="background-image: url('../assets/img/${song.image}')">
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
  nextSong() {
    this.currentIndexSong++
    if (this.currentIndexSong >= this.songs.length) {
      this.currentIndexSong = 0
    }
    this.loadCurrentSong()
  },
  prevSong() {
    this.currentIndexSong--
    if (this.currentIndexSong < 0) {
      this.currentIndexSong = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  randomSong() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (this.currentIndexSong === newIndex)
    this.currentIndexSong = newIndex
  },
  start() {
    this.defineProperties()
    this.handleEvents()
    this.loadCurrentSong()
    this.render()
  }
}
app.start()