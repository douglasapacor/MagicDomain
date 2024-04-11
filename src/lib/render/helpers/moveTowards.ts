import { Entity } from "../classes/Entity";
import { Vector2 } from "../classes/Vector2";

export function moveTowards(
  entity: Entity,
  destinationPosition: Vector2,
  speed: number,
): number {
  let distanceToTravelx = destinationPosition.x - entity.position.x;
  let distanceToTravely = destinationPosition.y - entity.position.y;

  let distance = Math.sqrt(distanceToTravelx ** 2 + distanceToTravely ** 2);

  if (distance <= speed) {
    entity.position = destinationPosition;
    return 0;
  }

  const normalizedX = distanceToTravelx / distance;
  const normalizedY = distanceToTravely / distance;

  const movementX = normalizedX * speed;
  const movementY = normalizedY * speed;

  entity.position = new Vector2(
    entity.position.x + movementX,
    entity.position.y + movementY,
  );

  distanceToTravelx = destinationPosition.x - entity.position.x;
  distanceToTravely = destinationPosition.y - entity.position.y;

  distance = Math.sqrt(distanceToTravelx ** 2 + distanceToTravely ** 2);

  return distance - speed;
}
