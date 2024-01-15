export function moveTowards(
  person: { position: { x: number; y: number } },
  destinationPosition: { x: number; y: number },
  speed: number
): number {
  let distanceToTravelX: number = destinationPosition.x - person.position.x;
  let distanceToTravelY: number = destinationPosition.y - person.position.y;

  let distance: number = Math.sqrt(
    distanceToTravelX ** 2 + distanceToTravelY ** 2
  );

  if (distance <= speed) {
    person.position.x = destinationPosition.x;
    person.position.y = destinationPosition.y;
  } else {
    const normalizedX = distanceToTravelX / distance;
    const normalizedY = distanceToTravelY / distance;

    person.position.x += normalizedX * speed;
    person.position.y += normalizedY * speed;

    distanceToTravelX = destinationPosition.x - person.position.x;
    distanceToTravelY = destinationPosition.y - person.position.y;

    distance = Math.sqrt(distanceToTravelX ** 2 + distanceToTravelY ** 2);
  }

  return distance;
}
