var WATER_POINT_TYPE = "WATER";
var EARTH_POINT_TYPE = "EARTH";
var POINT_TYPES = [WATER_POINT_TYPE, EARTH_POINT_TYPE];

var DEFAULT_WATER_COLOR = [30, 144, 255];
var DEFAULT_EARTH_COLOR = [105, 105, 105];
var DEFAULT_COLORS = {
  [WATER_POINT_TYPE]: DEFAULT_WATER_COLOR, // blue
  [EARTH_POINT_TYPE]: DEFAULT_EARTH_COLOR, // dark grey
};

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max);
}

class Map {
  constructor(height, width) {
    var map = [];
    for (var i = 0; i < height; i++) {
      var row = [];
      for (var j = 0; j < width; j++) {
        row.push(this.generatePointType());
      }
      map.push(row);
    }
    this.map = map;
  }

  generatePointType() {
    return POINT_TYPES[generateRandomInteger(2)];
  }

  generateRandomColor() {
    var color = undefined;
    while (!color || Object.keys(DEFAULT_COLORS).includes(color)) {
      color = [];
      for (var i = 0; i < 3; i++) {
        color.push(generateRandomInteger(256));
      }
    }
    return color;
  }

  getRawMap() {
    var rawMap = [];
    for (var i = 0; i < this.map.length; i++) {
      var row = [];
      for (var j = 0; j < this.map[i].length; j++) {
        row.push(DEFAULT_COLORS[this.map[i][j]]);
      }
      rawMap.push(row);
    }
    return rawMap;
  }


  DFS(M, i, j, ROW, COL,color)
  {
      // Base condition
      // if i less than 0 or j less than 0 or i greater than ROW-1 or j greater than COL-  or if M[i][j] != 1 then we will simply return
      if (i < 0 || j < 0 || i > (ROW - 1) || j > (COL - 1) || M[i][j] != DEFAULT_EARTH_COLOR)
      {
          return;
      }
      
      if (M[i][j] == DEFAULT_EARTH_COLOR)
      {
          console.log(i,j)
          M[i][j] = DEFAULT_WATER_COLOR;
          console.log(document.getElementById('map').children.item(0).children[i].children[j].style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`)
          this.DFS(M, i + 1, j, ROW, COL,color);     //right side traversal
          this.DFS(M, i - 1, j, ROW, COL,color);     //left side traversal
          this.DFS(M, i, j + 1, ROW, COL,color);     //upward side traversal
          this.DFS(M, i, j - 1, ROW, COL,color);     //downward side traversal
          
      }
  }

  getColoredMap() {
    
    // // TODO: That's where you work
    let map = this.getRawMap();
    let ROW = map.length;
        let COL = map[0].length;
        let count = 0;
        var color = [0,0,0]

        for (let i = 0; i < ROW; i++)
        {
            for (let j = 0; j < COL; j++)
            {
                if (map[i][j] == DEFAULT_EARTH_COLOR)
                {
                    
                    color = this.generateRandomColor()
                    this.DFS(map, i, j, ROW, COL, color); //traversal starts from current cell
                    console.log("/////////////////////",color)
                }
            }
        }
        console.log(count);

    }
  
  }

