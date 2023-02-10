/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play - pause - seek
 * 4. CD rotate
 * 5. Next - Prev
 * 6. Random
 * 7. Next - Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */

const $$ = document.querySelectorAll.bind(document);
const $ = document.querySelector.bind(document);

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $(".cd");
const player = $(".player");
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  currentIndex: 0,
  songs: [
    {
      name: "Querry",
      singer: "QNT x TRUNG TRẦN ft RPT MCK",
      path: "assets/music/querry.mp3",
      image: "assets/img/querry.jpg",
    },
    {
      name: "Bộ tộc cùng già",
      singer: "Thiện Hưng",
      path: "assets/music/bo-toc-cung-gia.mp3",
      image: "assets/img/bo-toc-cung-gia.jpg",
    },
    {
      name: "Tình yêu bát cơm rang",
      singer: "Thiện Hưng",
      path: "assets/music/tinh-yeu-bat-com-rang.mp3",
      image: "assets/img/tinh-yeu-bat-com-rang.jpg",
    },
    {
      name: "Mong một ngày anh nhớ đến em",
      singer: "Huỳnh James x Pjnboys",
      path: "assets/music/mong-mot-ngay-em-nho-den-anh.mp3",
      image: "assets/img/mong-mot-ngay-em-nho-den-anh.jpg",
    },
    {
      name: "Mặt mộc",
      singer: "Phạm Nguyên Ngọc x VAnh",
      path: "assets/music/mat-moc.mp3",
      image: "assets/img/mat-moc.jpg",
    },
    {
      name: "Chìm sâu",
      singer: "MCK",
      path: "assets/music/chim-sau.mp3",
      image: "assets/img/chim-sau.jpg",
    },
    {
      name: "Cứ chill thôi",
      singer: "Chillies x Suni Hạ Linh x Rhymastic",
      path: "assets/music/cu-chill-thoi.mp3",
      image: "assets/img/cu-chill-thoi.jpg",
    },
    {
      name: "Muốn nói với em",
      singer: "Kiều Minh Tuấn x Lê Chi",
      path: "assets/music/muon-noi-voi-em.mp3",
      image: "assets/img/muon-noi-voi-em.jpg",
    },
    {
      name: "Thằng điên",
      singer: "JustaTee x Phương Ly",
      path: "assets/music/thang-dien.mp3",
      image: "assets/img/thang-dien.jpg",
    },
    {
      name: "Đã lỡ yêu em nhiều",
      singer: "JustaTee",
      path: "assets/music/da-lo-yeu-em-nhieu.mp3",
      image: "assets/img/da-lo-yeu-em-nhieu.jpg",
    },
  ],
  render() {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('./${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
      `;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  defineProperties() {
    Object.defineProperty(this, 'currentSong', {
      get() {
        return this.songs[this.currentIndex]
      }
    })
  },
  handleEvents() {
    const _this = this
    const cdWidth = cd.offsetWidth;
    document.onscroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // play song
    playBtn.onclick = () => {
      _this.isPlaying ? audio.pause() : audio.play()
    }

    // song is playing
    audio.onplay = () => {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    // pause song
    audio.onpause = () => {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    // seek song
    audio.ontimeupdate = () => {
      if (audio.duration) {
        const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPercent
      }
    }

    // when seeking
    progress.onchange = (e) => {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime
    }

    // CD rotate
    const cdThumbAnimate = cdThumb.animate([
      { transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity
    })
    cdThumbAnimate.pause()

    // Next song
    nextBtn.onclick = () => {
      _this.isRandom ? _this.randomSong() : _this.nextSong()
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    // Prev song
    prevBtn.onclick = () => {
      _this.isRandom ? _this.randomSong() : _this.prevSong()
      audio.play()
      _this.render()
      _this.scrollToActiveSong()
    }

    // Random song
    randomBtn.onclick = () => {
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('active', _this.isRandom)
    }

    // When songs is ended
    audio.onended = () => {
      _this.isRepeat ? audio.play() : nextBtn.click()
    }

    // When repeat song
    repeatBtn.onclick = () => {
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active', _this.isRepeat)
    }

    // When click song at playlist
    playList.onclick = (e) => {
      const songNode = e.target.closest('.song:not(.active)')
      if (songNode || e.target.closest('.option')) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong()
          _this.render()
          audio.play()
        }

        if (e.target.closest('.option')) {
          // 
        }
      }
    }
  },
  scrollToActiveSong() {
    setTimeout(() => {
      $('.song.active').scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 200)
  },
  nextSong() {
   this.currentIndex++
    if (this.currentIndex >=this.songs.length) {
     this.currentIndex = 0
    }
   this.loadCurrentSong()
  },
  prevSong() {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadCurrentSong()
  },
  randomSong() {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadCurrentSong()
  },
  loadCurrentSong() {
    heading.textContent = this.currentSong.name.toUpperCase()
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
    audio.src = this.currentSong.path
  },
  start() {
    this.handleEvents();
    this.defineProperties();
    this.render();
    this.loadCurrentSong()
  },
};

app.start();
