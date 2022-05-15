import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import Swal from "sweetalert2";

const Brick: FC<{
  callback: (ind: number) => void;
  index: number;
  turn: { player: number };
  mapArray: Array<number>;
}> = ({ callback, index, turn, mapArray }) => {
  const [player, setPlayer] = useState<number>(1);
  const [touched, setTouched] = useState(false);
  const clickHandler = () => {
    console.log("click Brick");
    console.log("touched: " + touched + " || player: " + player);
    console.log("mapArray: " + mapArray);

    if (mapArray[index] == 0) {
      setPlayer(turn.player);
    }
    setTouched(true);
    callback(index);
  };

  const checkImg = () => {
    if (player == 1 && touched == true) {
      return require("./assets/x_img.png");
    } else if (player == 2 && touched == true) {
      return require("./assets/circle_img.png");
    } else return "";
  };

  var img =
    player == 1
      ? require("./assets/x_img.png")
      : require("./assets/circle_img.png");
  return (
    <View style={[styles.brick]}>
      <TouchableOpacity onPress={clickHandler} style={[styles.brick]}>
        <Image
          style={{ width: 100, height: 100, margin: 10 }}
          source={checkImg()}
        ></Image>
      </TouchableOpacity>
    </View>
  );
};

const App: FC = () => {
  const turn = { player: 1 }; //1: X , 2: O

  var mapArray = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  const clickHandler = (ind: number) => {
    console.log("click App " + ind);
    if (mapArray[ind] != 1 && mapArray[ind] != 2) {
      if (turn.player == 1) {
        mapArray[ind] = 1;
        turn.player = 2;
      } else {
        mapArray[ind] = 2;
        turn.player = 1;
      }
      checkBoard();
    } else {
      console.log("this already taken");
      Alert.alert("this already taken");
    }
  };

  const reloadHandler = () => {
    console.log("click reloadHandler");
    window.location.reload();
  };

  const checkBoard = () => {
    const firstRow =
      mapArray[0] == mapArray[1] &&
      mapArray[1] == mapArray[2] &&
      mapArray[0] == mapArray[2] &&
      mapArray[0] != 0;
    const secondRow =
      mapArray[3] == mapArray[4] &&
      mapArray[4] == mapArray[5] &&
      mapArray[3] == mapArray[5] &&
      mapArray[3] != 0;
    const thirdRow =
      mapArray[6] == mapArray[7] &&
      mapArray[7] == mapArray[8] &&
      mapArray[6] == mapArray[8] &&
      mapArray[6] != 0;
    const firstColumn =
      mapArray[0] == mapArray[3] &&
      mapArray[3] == mapArray[6] &&
      mapArray[0] == mapArray[6] &&
      mapArray[0] != 0;
    const secondColumn =
      mapArray[1] == mapArray[4] &&
      mapArray[4] == mapArray[7] &&
      mapArray[1] == mapArray[7] &&
      mapArray[1] != 0;
    const thirdColumn =
      mapArray[2] == mapArray[5] &&
      mapArray[5] == mapArray[8] &&
      mapArray[2] == mapArray[8] &&
      mapArray[2] != 0;
    const firstDiag =
      mapArray[0] == mapArray[4] &&
      mapArray[4] == mapArray[8] &&
      mapArray[0] == mapArray[8] &&
      mapArray[0] != 0;
    const secondDiag =
      mapArray[2] == mapArray[4] &&
      mapArray[4] == mapArray[4] &&
      mapArray[2] == mapArray[6] &&
      mapArray[2] != 0;

    var winner = 0;

    if (
      firstRow ||
      secondRow ||
      thirdRow ||
      firstColumn ||
      secondColumn ||
      thirdColumn ||
      firstDiag ||
      secondDiag
    ) {
      if (firstRow) {
        if (mapArray[0] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (secondRow) {
        if (mapArray[3] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (thirdRow) {
        if (mapArray[6] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (firstColumn) {
        if (mapArray[0] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (secondColumn) {
        if (mapArray[1] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (thirdColumn) {
        if (mapArray[2] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (firstDiag) {
        if (mapArray[0] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      if (secondDiag) {
        if (mapArray[2] == 1) {
          winner = 1;
        } else {
          winner = 2;
        }
      }
      Swal.fire(
        "Congratulation!",
        `player number ${winner} is the winner`
      ).then(() => {
        reloadHandler();
      });

    }
    var boardFilled = (mapArray.filter(x => x == 0)).length;
    if(boardFilled == 0 && !firstRow && !secondRow &&!thirdRow && !firstColumn &&!secondColumn &&!thirdColumn &&!firstDiag && !secondDiag){
      Swal.fire(
        "Ouu No!",
        `No Winner. Try Again!`
      ).then(() => {
        reloadHandler();
      });
    }
  };

  console.log("Hello React");
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.rowContainer}>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={0}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={1}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={2}
          turn={turn}
        ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={3}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={4}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={5}
          turn={turn}
        ></Brick>
      </View>
      <View style={styles.rowContainer}>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={6}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={7}
          turn={turn}
        ></Brick>
        <Brick
          callback={clickHandler}
          mapArray={mapArray}
          index={8}
          turn={turn}
        ></Brick>
      </View>

      <TouchableOpacity onPress={reloadHandler}>
        <Text style={styles.button}>RELOAD</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "pink",
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  rowContainer: {
    flexDirection: "row",
  },
  label: {
    flex: 1,
  },
  child: {
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  brick: {
    backgroundColor: "white",
    margin: 5,
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
  },
  button: {
    margin: 5,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: "grey",
    borderRadius: 10,
  },
});

export default App;
