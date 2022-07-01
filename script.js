function createShip(length) {
  if (length > 4 || length < 1) {
    throw new Error("Wrong Length");
  } else
    return {
      array: [...Array(length)],
      length: length,
      hit(hitPosition) {
        if (hitPosition >= this.array.length || hitPosition < 0) {
          throw new Error("Wrong Position");
        }
        this.array[hitPosition] = "hit";
      },
      isSink() {
        return this.array.every((position) => position === "hit");
      },
    };
}
const ship1 = createShip(1);
const ship2 = createShip(1);
const ship3 = createShip(1);
const ship4 = createShip(1);
const ship5 = createShip(2);
const ship6 = createShip(2);
const ship7 = createShip(2);
const ship8 = createShip(3);
const ship9 = createShip(3);
const ship10 = createShip(4);
