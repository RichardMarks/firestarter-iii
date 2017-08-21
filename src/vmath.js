export const point = (x, y) => {
  const p = {
    x,
    y,
    toString () {
      return `Point(${p.x}, ${p.y})`
    }
  }
  return p
}

export const vector = (x, y) => {
  return point(x, y)
}

export const magnitude = v => {
  return Math.sqrt(v.x * v.x + v.y * v.y)
}

export const normalize = v => {
  const length = magnitude(v)
  if (length !== 0) {
    v.x /= length
    v.y /= length
  }
}

export const perpendicular = v => {
  return point(-v.y, v.x)
}

export const dotProduct = (v1, v2) => {
  return v1.x * v2.x + v1.y * v2.y
}

export const perpDotProduct = (v1, v2) => {
  return dotProduct(perpendicular(v1), v2)
}
