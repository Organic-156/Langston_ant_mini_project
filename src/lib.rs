use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy, PartialEq)]
pub enum Cell {
    White = 0,
    Black = 1,
}

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum Direction {
    Up,
    Right,
    Down,
    Left,
}

#[wasm_bindgen]
pub struct LangtonsAnt {
    grid: Vec<Cell>,
    width: u32,
    height: u32,
    ant_x: u32,
    ant_y: u32,
    direction: Direction,
    running: bool,
}

#[wasm_bindgen]
impl LangtonsAnt {
    pub fn new() -> Self {
        let width = 25;
        let height = 25;
        let grid = vec![Cell::White; (width * height) as usize];
        let ant_x = width / 2;
        let ant_y = height / 2;
        let direction = Direction::Up;
        let running = true;

        Self {
            grid,
            width,
            height,
            ant_x,
            ant_y,
            direction,
            running,
        }
    }

    fn get_index(&self, x: u32, y: u32) -> usize {
        (y * self.width + x) as usize
    }

    pub fn step(&mut self) {
        if !self.running { return; }

        let idx = self.get_index(self.ant_x, self.ant_y);

        match self.grid[idx] {
            Cell::White => {
                self.direction = match self.direction {
                    Direction::Up => Direction::Right,
                    Direction::Right => Direction::Down,
                    Direction::Down => Direction::Left,
                    Direction::Left => Direction::Up,
                };
                self.grid[idx] = Cell::Black;
            }
            Cell::Black => {
                self.direction = match self.direction {
                    Direction::Up => Direction::Left,
                    Direction::Right => Direction::Up,
                    Direction::Down => Direction::Right,
                    Direction::Left => Direction::Down,
                };
                self.grid[idx] = Cell::White;
            }
        }

        match self.direction {
            Direction::Up => {
                if self.ant_y > 0 { self.ant_y -= 1; } else { self.running = false; }
            }
            Direction::Right => {
                if self.ant_x < self.width - 1 { self.ant_x += 1; } else { self.running = false; }
            }
            Direction::Down => {
                if self.ant_y < self.height - 1 { self.ant_y += 1; } else { self.running = false; }
            }
            Direction::Left => {
                if self.ant_x > 0 { self.ant_x -= 1; } else { self.running = false; }
            }
        }
    }

    pub fn get_grid_ptr(&self) -> *const Cell {
        self.grid.as_ptr()
    }

    pub fn get_ant_x(&self) -> u32 {
        self.ant_x
    }

    pub fn get_ant_y(&self) -> u32 {
        self.ant_y
    }

    pub fn get_direction(&self) -> u32 {
        match self.direction {
            Direction::Up => 0,
            Direction::Right => 1,
            Direction::Down => 2,
            Direction::Left => 3,
        }
    }

    pub fn is_running(&self) -> bool {
        self.running
    }
}
