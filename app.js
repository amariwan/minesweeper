document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const container = document.querySelector(".container");
  const flagsLeft = document.querySelector("#flags-left");
  const result = document.querySelector("#result-message");
  const modal = document.querySelector("#modal");
  const background = document.querySelector("#background");
  const bombSadFace = document.querySelector("#sad-face");
  const bombHappyFace = document.querySelector("#happy-face");
  const timer = document.querySelector(".counter");
  const finalTimeDisplay = document.querySelector(".time-display");
  const resultTime = document.querySelector(".result-time");

  const levels = [
    {
      name: "Easy",
      width: 10,
      bombs: 15,
    },
    {
      name: "Medium",
      width: 15,
      bombs: 30,
    },
    {
      name: "Hard",
      width: 20,
      bombs: 70,
    },
  ];
  const flagIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 287.987 287.987" fill="#695ca8" style="enable-background:new 0 0 287.987 287.987;" xml:space="preserve"><g><path d="M228.702,141.029c-3.114-3.754-3.114-9.193,0-12.946l33.58-40.474c2.509-3.024,3.044-7.226,1.374-10.783   c-1.671-3.557-5.246-5.828-9.176-5.828h-57.647v60.98c0,16.618-13.52,30.138-30.138,30.138h-47.093v25.86   c0,5.599,4.539,10.138,10.138,10.138h124.74c3.93,0,7.505-2.271,9.176-5.828c1.671-3.557,1.135-7.759-1.374-10.783L228.702,141.029   z"/><path d="M176.832,131.978V25.138c0-5.599-4.539-10.138-10.138-10.138H53.37c0-8.284-6.716-15-15-15s-15,6.716-15,15   c0,7.827,0,253.91,0,257.987c0,8.284,6.716,15,15,15s15-6.716,15-15c0-6.943,0-126.106,0-130.871h113.324   C172.293,142.116,176.832,137.577,176.832,131.978z"/></g></svg>';
  const bombIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 512 512" fill="#695ca8" ><g><path d="m411.313,123.313c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32-9.375,9.375-20.688-20.688c-12.484-12.5-32.766-12.5-45.25,0l-16,16c-1.261,1.261-2.304,2.648-3.31,4.051-21.739-8.561-45.324-13.426-70.065-13.426-105.867,0-192,86.133-192,192s86.133,192 192,192 192-86.133 192-192c0-24.741-4.864-48.327-13.426-70.065 1.402-1.007 2.79-2.049 4.051-3.31l16-16c12.5-12.492 12.5-32.758 0-45.25l-20.688-20.688 9.375-9.375 32.001-31.999zm-219.313,100.687c-52.938,0-96,43.063-96,96 0,8.836-7.164,16-16,16s-16-7.164-16-16c0-70.578 57.422-128 128-128 8.836,0 16,7.164 16,16s-7.164,16-16,16z"/><path d="m459.02,148.98c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l16,16c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16.001-16z"/><path d="m340.395,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688 6.25-6.25 6.25-16.375 0-22.625l-16-16c-6.25-6.25-16.375-6.25-22.625,0s-6.25,16.375 0,22.625l15.999,16z"/><path d="m400,64c8.844,0 16-7.164 16-16v-32c0-8.836-7.156-16-16-16-8.844,0-16,7.164-16,16v32c0,8.836 7.156,16 16,16z"/><path d="m496,96.586h-32c-8.844,0-16,7.164-16,16 0,8.836 7.156,16 16,16h32c8.844,0 16-7.164 16-16 0-8.836-7.156-16-16-16z"/><path d="m436.98,75.605c3.125,3.125 7.219,4.688 11.313,4.688 4.094,0 8.188-1.563 11.313-4.688l32-32c6.25-6.25 6.25-16.375 0-22.625s-16.375-6.25-22.625,0l-32,32c-6.251,6.25-6.251,16.375-0.001,22.625z"/></g></svg>';

  let root = document.documentElement;
  let selectedLevel = levels[0];
  let flags = 0;
  let tiles = [];
  let isGameOver = false;
  let isTimerOn = false;
  let timerCount = 0;
  let finalTime = 0;

  let numberColors = [
    "#8B6AF5",
    "#74c2f9",
    "#42dfbc",
    "#f9dd5b",
    "#FEAC5E",
    "#ff5d9e",
    "#F29FF5",
    "#c154d8",
  ];
  let bgColors = [
    "#b39ffd",
    "#93c1fd",
    "#8af1f8",
    "#f9dd5b",
    "#FEAC5E",
    "#f87dae",
    "#f6b8f8",
    "#f7efce",
  ];

  function getMainColor() {
    const randomColor =
      numberColors[Math.floor(Math.random() * numberColors.length)];
    root.style.setProperty("--main-color", randomColor);
    root.style.setProperty(
      "--dark-color",
      lightenDarkenColor(randomColor, -50)
    );
  }

  function clearBoard() {
    isGameOver = false;
    flags = 0;
    if (isTimerOn) stopTimer();
    timerCount = 0;

    // isTimerOn = false;
    timer.innerHTML = "000";
    tiles.forEach((tile) => {
      tile.remove();
    });
    tiles = [];
    container.classList.remove("shake");
    bombHappyFace.classList.remove("show");
    bombSadFace.classList.remove("show");
    resultTime.classList.remove("show");
    createBoard();
  }

  function setUp() {
    createBackground();
    createBoard();
  }

  function createBoard() {
    getMainColor();

    flagsLeft.innerHTML = selectedLevel.bombs;
    const width = selectedLevel.width;
    const tileWidth = parseInt(
      getComputedStyle(root).getPropertyValue("--tile-width")
    );
    root.style.setProperty("--grid-width", width * tileWidth);

    //add tiles
    for (let i = 0; i < width * width; i++) {
      const tile = document.createElement("div");
      tile.setAttribute("id", i);
      tile.classList.add("tile");
      grid.appendChild(tile);
      tiles.push(tile);

      //left click
      tile.addEventListener("click", () => clickTile(tile));

      //ctrl and right click
      tile.oncontextmenu = (e) => {
        e.preventDefault();
        addFlag(tile);
      };
    }

    //add bombs
    const randomTiles = tiles
      .sort(() => Math.random() - 0.5)
      .slice(0, selectedLevel.bombs)
      .map((tile) => tile.id); // suffle tile's id and select 20 firsts to get 20 random tiles
    tiles.forEach((tile) =>
      randomTiles.includes(tile.id)
        ? tile.classList.add("has-bomb")
        : tile.classList.add("is-empty")
    ); // if tile's id is in ramdomTile array, add bomb
    tiles.sort((a, b) => a.id - b.id); //sort array by id again

    //add numbers
    for (let i = 0; i < tiles.length; i++) {
      let total = 0;
      const isLeftEdge = i % width === 0;
      const isRightEdge = i % width === width - 1;

      if (!tiles[i].classList.contains("has-bomb")) {
        if (!isLeftEdge) {
          if (tiles[i - 1] && tiles[i - 1].classList.contains("has-bomb"))
            total++;
          if (
            tiles[i - 1 + width] &&
            tiles[i - 1 + width].classList.contains("has-bomb")
          )
            total++;
          if (
            tiles[i - 1 - width] &&
            tiles[i - 1 - width].classList.contains("has-bomb")
          )
            total++;
        }

        if (!isRightEdge) {
          if (tiles[i + 1] && tiles[i + 1].classList.contains("has-bomb"))
            total++;
          if (
            tiles[i + 1 + width] &&
            tiles[i + 1 + width].classList.contains("has-bomb")
          )
            total++;
          if (
            tiles[i + 1 - width] &&
            tiles[i + 1 - width].classList.contains("has-bomb")
          )
            total++;
        }

        if (tiles[i - width] && tiles[i - width].classList.contains("has-bomb"))
          total++;
        if (tiles[i + width] && tiles[i + width].classList.contains("has-bomb"))
          total++;

        tiles[i].setAttribute("data", total);
      }
    }
  }

  //click on tile
  function clickTile(tile) {
    if (!isTimerOn) startTimer();
    let currentId = tile.id;
    if (isGameOver) return;
    if (tile.classList.contains("checked") || tile.classList.contains("flag"))
      return;
    if (tile.classList.contains("has-bomb")) {
      gameOver(tile);
    } else {
      let total = tile.getAttribute("data");
      if (total != 0) {
        tile.classList.add("checked");
        tile.style.color = numberColors[total - 1];
        tile.style.textShadow =
          "1px 1px" + lightenDarkenColor(numberColors[total - 1], -20);
        tile.innerHTML = total;
        return;
      }
      checktile(currentId);
    }
    tile.classList.add("checked");
  }

  //check neighboring tiles once tile is clicked
  function checktile(currentId) {
    const width = selectedLevel.width;
    const isLeftEdge = currentId % width === 0;
    const isRightEdge = currentId % width === width - 1;
    const parsedId = parseInt(currentId);

    function loopThroughtiles(tileId) {
      const newId = tileId.id;
      const newTile = document.getElementById(newId);
      clickTile(newTile);
    }
    setTimeout(() => {
      if (!isRightEdge) {
        if (tiles[parsedId + 1 - width])
          loopThroughtiles(tiles[parsedId + 1 - width]);
        if (tiles[parsedId + 1]) loopThroughtiles(tiles[parsedId + 1]);
        if (tiles[parsedId + 1 + width])
          loopThroughtiles(tiles[parsedId + 1 + width]);
      }
      if (!isLeftEdge) {
        if (tiles[parsedId - 1]) loopThroughtiles(tiles[parsedId - 1]);
        if (tiles[parsedId - 1 - width])
          loopThroughtiles(tiles[parsedId - 1 - width]);
        if (tiles[parsedId - 1 + width])
          loopThroughtiles(tiles[parsedId - 1 + width]);
      }
      if (tiles[parsedId - width]) loopThroughtiles(tiles[parsedId - width]);
      if (tiles[parsedId + width]) loopThroughtiles(tiles[parsedId + width]);
    }, 50);
  }

  //game over
  function gameOver(currentTile) {
    isGameOver = true;
    stopTimer();
    currentTile.innerHTML = bombIcon;
    container.classList.add("shake");
    currentTile.style.backgroundColor =
      bgColors[Math.floor(Math.random() * bgColors.length)];
    currentTile.classList.remove("has-bomb");
    currentTile.classList.add("checked");
    let itemsProcessed = 0;

    //show all the bombs
    const bombTiles = tiles.filter((tile) =>
      tile.classList.contains("has-bomb")
    );
    bombTiles.forEach((tile, index) => {
      setTimeout(() => {
        tile.innerHTML = bombIcon;
        tile.style.backgroundColor =
          bgColors[Math.floor(Math.random() * bgColors.length)];
        tile.classList.remove("has-bomb");
        tile.classList.add("checked");
        itemsProcessed++;
        if (itemsProcessed === bombTiles.length) {
          setTimeout(() => {
            modal.classList.add("show");
            bombSadFace.classList.add("show");
            result.innerHTML = "Game Over!";
          }, 1000);
        }
      }, 10 * index);
    });
  }

  //add Flag with right click
  function addFlag(tile) {
    if (isGameOver) return;
    if (!tile.classList.contains("checked") && flags < selectedLevel.bombs) {
      if (!tile.classList.contains("flag")) {
        tile.classList.add("flag");
        tile.innerHTML = flagIcon;
        flags++;
        flagsLeft.innerHTML = selectedLevel.bombs - flags;
        checkForWin();
      } else {
        tile.classList.remove("flag");
        tile.innerHTML = "";
        flags--;
        flagsLeft.innerHTML = selectedLevel.bombs - flags;
      }
    }
  }

  //check for win
  function checkForWin() {
    let matches = 0;
    tiles.forEach((tile) => {
      if (
        tile.classList.contains("flag") &&
        tile.classList.contains("has-bomb")
      ) {
        matches++;
      }
      if (matches === selectedLevel.bombs) {
        stopTimer();
        modal.classList.add("show");
        bombHappyFace.classList.add("show");
        resultTime.classList.add("show");
        result.innerHTML = "CONGRATULATIONS!";
        isGameOver = true;

        // reveal all remaining tiles
        if (!tile.classList.contains("checked")) {
          tile.classList.add("checked");
        }
      }
    });
  }

  function replay() {
    if (modal.classList.contains("show")) modal.classList.remove("show");
    clearBoard();
  }

  document.querySelector("#new-game").addEventListener("click", replay);

  // timer functions
  function startTimer() {
    isTimerOn = true;
    let sec = 0;
    timerCount = setInterval(() => {
      sec++;
      timer.innerHTML = ("00" + sec).slice(-3);
      if (sec > 998) clearInterval(timerCount);
      finalTime = sec;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerCount);
    isTimerOn = false;
    finalTimeDisplay.innerHTML = finalTime;
  }

  // dropdown menu functions
  const dropdownTitle = document.querySelector(".dropdown .title");
  const dropdownOptions = document.querySelectorAll(".dropdown .option");

  function toggleMenuDisplay(e) {
    const dropdown = e.target.parentNode; //getting the parent selector
    const menu = dropdown.querySelector(".menu"); //selecting 'menu' fron the parent selector
    menu.classList.toggle("show");
  }

  function handleOptionSelected(e) {
    e.target.parentNode.classList.toggle("show"); // using parentnode to get the menu  elementfrom option elements
    dropdownTitle.textContent = e.target.textContent;
    // here: select current level form levels object
    selectedLevel = levels.find((level) => level.name === e.target.textContent);
    clearBoard();
  }

  // event listeners
  dropdownTitle.addEventListener("click", toggleMenuDisplay);
  dropdownOptions.forEach((option) =>
    option.addEventListener("click", handleOptionSelected)
  );

  // bg functions
  function addElement(x, y) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS(
      "http://www.w3.org/1999/xlink",
      "xlink:href",
      "#bomb-svg"
    );
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("style", "top: " + y + "px; left: " + x + "px");
    svg.appendChild(use);
    background.appendChild(svg);
  }

  function createBackground() {
    const spacing = 60;
    const w = window.innerWidth;
    const h = window.innerHeight;
    for (let y = 0; y <= h; y += spacing) {
      if (y % (spacing * 2) === 0) {
        for (let x = 0; x <= w; x += spacing) {
          addElement(x, y);
        }
      } else {
        for (let x = -(spacing / 2); x <= w; x += spacing) {
          addElement(x, y);
        }
      }
    }
  }

  //helper function
  function lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00ff) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000ff) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }

  setUp();
});
