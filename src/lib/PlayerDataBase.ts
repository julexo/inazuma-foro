export interface PlayerData {
  id: string;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  team: string[]; 
  element: 'Fuego' | 'Viento' | 'Bosque' | 'Montaña';
  avatar: string;
}

export const playersDatabase: PlayerData[] = [
  // Raimon
  { id: 'Mark Evans', name: 'Mark Evans', position: 'GK', team: ['Raimon','Inazuma National'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkEvans&backgroundColor=0ea5e9' },
  { id: 'Jack Wallside', name: 'Jack Wallside', position: 'DF', team: ['Raimon','Inazuma National'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JackWallside&backgroundColor=a16207' },
  { id: 'Nathan Swift', name: 'Nathan Swift', position: 'DF', team: ['Raimon','Inazuma National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwift&backgroundColor=06b6d4' },
  { id: 'Jim Wraith', name: 'Jim Wraith', position: 'DF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwiftJr&backgroundColor=0891b2' },
  { id: 'Tod Ironside', name: 'Tod Ironside', position: 'DF', team: ['Raimon','Inazuma National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SilviaWoods&backgroundColor=16a34a' },
  { id: 'Steve Grim', name: 'Steve Grim', position: 'MF', team: ['Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Kevin Dragonfly', name: 'Kevin Dragonfly', position: 'FW', team: ['Raimon','Inazuma National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KevinDragonfly&backgroundColor=ef4444' },
  { id: 'Axel Blaze', name: 'Axel Blaze', position: 'FW', team: ['Raimon','Inazuma National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AxelBlaze&backgroundColor=fb923c' },
  { id: 'Sam Kincaid', name: 'Sam Kincaid', position: 'MF', team: ['Raimon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=XavierFoster&backgroundColor=dc2626' },
  { id: 'Bobby Shearer', name: 'Bobby Shearer', position: 'DF', team: ['Raimon', 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BobbyShearer&backgroundColor=fbbf24' },
  { id: 'Erik Eagle', name: 'Erik Eagle', position: 'MF', team: ['Raimon', 'Unicorn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TodIronside&backgroundColor=92400e' },
  { id: 'Maxwell Carson', name: 'Maxwell Carson', position: 'FW', team: ['Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaxCannon&backgroundColor=f59e0b' },
  { id: 'Shadow Cimmerian', name: 'Shadow Cimmerian', position: 'FW', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimWraith&backgroundColor=14532d' },
  { id: 'Tim Saunders', name: 'Tim Saunders', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'William Glass', name: 'William Glass', position: 'FW', team: ['Raimon'], element: 'Bosque', avatar: 'https://inazuma.fandom.com/es/wiki/William_Glass' },
  { id: 'Talon Lewis', name: 'Talon Lewis', position: 'FW', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Harper Evans', name: 'Harper Evans', position: 'FW', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Darian Moonward', name: 'Darian Moonward', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Eleanor Estrella', name: 'Eleanor Estrella', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Maddock Jackson', name: 'Maddock Jackson', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Colton Sharps', name: 'Colotn Sharps', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Jazmine Carmine', name: 'Jazmine Carmine', position: 'MF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Boone Wretman', name: 'Boone Wretman', position: 'DF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Clement Mariner', name: 'Clement Mariner', position: 'DF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Viorain Maleby', name: 'Viorain Maleby', position: 'DF', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Zander Warmington', name: 'Zander Warmington', position: 'GK', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },

  //Raimon First Squad
  { id: 'Arion Sherwind', name: 'Arion Sherwind', position: 'MF', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Victor Blade', name: 'Victor Blade', position: 'FW', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Riccardo Di Rigo', name: 'Riccardo Di Rigo', position: 'MF', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Jean-Pierre Lapin', name: 'Jean-Pierre Lapin', position: 'GK', team: ['Raimon First Squad', 'Earth Eleven','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Gabriel Garcia', name: 'Gabriel Garcia', position: 'DF', team: ['Raimon First Squad','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Samguk Han', name: 'Samguk Han', position: 'GK', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Subaru Honda', name: 'Subaru Honda', position: 'DF', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Wanli Changcheng', name: 'Wanli Changcheng', position: 'DF', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Adé Kébé', name: 'Adé Kébé', position: 'MF', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Eugene Peabody', name: 'Eugene Peabody', position: 'MF', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Michael Ballzack', name: 'Michael Ballzack', position: 'FW', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Doug MFArthur', name: 'Doug MFArthur', position: 'FW', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Aitor Cazador', name: 'Aitor Cazador', position: 'DF', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Ryoma Nishiki', name: 'Ryoma Nishiki', position: 'MF', team: ['Raimon First Squad','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Lucian Dark', name: 'Lucian Dark', position: 'FW', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Lars Dijkstra', name: 'Lars Dijkstra', position: 'MF', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Sven Johansson', name: 'Sven Johansson', position: 'DF', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Shunsuke Aoyama', name: 'Shunsuke Aoyama', position: 'MF', team: ['Raimon First Squad','Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Hugues Baudet', name: 'Hugues Baudet', position: 'MF', team: ['Raimon First Squad','Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Goldie Lemon', name: 'Goldie Lemon', position: 'DF', team: ['Raimon First Squad','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Goldie Lemon MM', name: 'Goldie Lemon', position: 'DF', team: ['Raimon First Squad','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Arion Sherwind MM1', name: 'Arion Sherwind', position: 'MF', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Victor Blade MM', name: 'Victor Blade', position: 'FW', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Riccardo Di Rigo MM', name: 'Riccardo Di Rigo', position: 'MF', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Jean-Pierre Lapin MM', name: 'Jean-Pierre Lapin', position: 'GK', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Gabriel Garcia MM', name: 'Gabriel Garcia', position: 'DF', team: ['Raimon First Squad','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Arion Sherwind MM2', name: 'Arion Sherwind', position: 'MF', team: ['Raimon First Squad','Earth Eleven','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Ryoma Nishiki MM', name: 'Ryoma Nishiki', position: 'MF', team: ['Raimon First Squad','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },

  //Raimon Second Squad
{ id: 'Montaña Tabano', name: 'Montaña Tabano', position: 'GK', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Tom Gato', name: 'Tom Gato', position: 'DF', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Joaquin Coronado', name: 'Joaquin Coronado', position: 'DF', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Connant Ó Briain', name: 'Connant Ó Briain', position: 'DF', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Sirius Starsky', name: 'Sirius Starsky', position: 'DF', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Bucky Woodchuck', name: 'Bucky Woodchuck', position: 'MF', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Punkie Mahican', name: 'Punkie Mahican', position: 'MF', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Jagur Meister', name: 'Jagur Meister', position: 'FW', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Friedrich Schiller', name: 'Friedrich Schiller', position: 'FW', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Adarn Shame', name: 'Adarn Shame', position: 'GK', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ota Shape', name: 'Ota Shape', position: 'DF', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Nogo Sarikid', name: 'Nogo Sarikid', position: 'MF', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },

//Raimon Veterans
{ id: 'Seymour Hillman', name: 'Seymour Hillman', position: 'GK', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Charles Island', name: 'Charles Island', position: 'DF', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Garret Hairtown', name: 'Garret Hairtown', position: 'DF', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Arthur Sweet', name: 'Arthur Sweet', position: 'DF', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Peter Mildred', name: 'Peter Mildred', position: 'MF', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Josh Nathaniel', name: 'Josh Nathaniel', position: 'MF', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Edward Gladstone', name: 'Edward Gladstone', position: 'MF', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Tyler Thomas', name: 'Tyler Thomas', position: 'MF', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Joseph Yosemite', name: 'Joseph Yosemite', position: 'FW', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ian Sufolk', name: 'Ian Sufolk', position: 'MF', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Constant Builder', name: 'Constant Builder', position: 'FW', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ted Poe', name: 'Ted Poe', position: 'FW', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Marshall Heart', name: 'Marshall Heart', position: 'FW', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Don Foreman', name: 'Don Foreman', position: 'MF', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Slot MacHines', name: 'Slot MacHines', position: 'DF', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Bill Steakspear', name: 'Bill Steakspear', position: 'DF', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },


  // Royal Academy
  { id: 'Jude Sharp', name: 'Jude Sharp', position: 'MF', team: [ 'Royal Academy','Inazuma National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Joseph King', name: 'Joseph King', position: 'GK', team: ['Royal Academy','Neo National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarrenLaChance&backgroundColor=15803d' },
  { id: 'Peter Drent', name: 'Peter Drent', position: 'DF', team: ['Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamKincaid&backgroundColor=78716c' },
  { id: 'Ben Simmons', name: 'Ben Simmons', position: 'DF', team: ['Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidSamford&backgroundColor=1e40af' },
  { id: 'Alan Master', name: 'Alan Master', position: 'MF', team: ['Royal Academy','Neo National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanGreenway&backgroundColor=166534' },
  { id: 'Gus Martin', name: 'Gus Martin', position: 'DF', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Herman Waldon', name: 'Herman Waldon', position: 'MF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jhon Bloom', name: 'Jhon BLoom', position: 'MF', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Derek Swing', name: 'Derek Swing', position: 'MF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Daniel Hatch', name: 'Daniel Hatch', position: 'FW', team: [ 'Royal Academy','Neo National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'David Samford', name: 'David Samford', position: 'FW', team: [ 'Royal Academy','Inazuma National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Bob Carlton', name: 'Bob Carlton', position: 'GK', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cliff Tomlinson', name: 'Cliff Tomlinson', position: 'FW', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jim Lawrenson', name: 'Jim Lawrenson', position: 'FW', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Barry Pots', name: 'Barry Pots', position: 'MF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Steve Ingham', name: 'Steve Ingham', position: 'FW', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Preston Princeton', name: 'Preston Priceton', position: 'GK', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Dracon Yale', name: 'Dracon Yale', position: 'DF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Duke Dartmouth', name: 'Duke Dartmouth', position: 'DF', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cameron Cambridge', name: 'Camberon Cambridge', position: 'DF', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Earl Eton', name: 'Earl Eton', position: 'MF', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Caesar Cornell', name: 'Caesar Cornell', position: 'MF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Hampton Harvard', name: 'Hampton Harvard', position: 'MF', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Baron Oxford', name: 'Baron Oxford', position: 'DF', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Sterling Stanford', name: 'Sterling Stanford', position: 'MF', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Colby Columbia', name: 'Colby Columbia', position: 'FW', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Rex Remington', name: 'Rex Remington', position: 'FW', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Fred Featherstonhaugh', name: 'Fred Featherstonhaugh', position: 'GK', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Arthur Ascot', name: 'Arthur Ascot', position: 'DF', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Stuart St John', name: 'Stuart St John', position: 'DF', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Wenceslas Wales', name: 'Wenceslas Wales', position: 'FW', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Yorick York', name: 'Yorick York', position: 'MF', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },

  //Royal Academy Redux
  { id: 'Joseph King RX', name: 'Joseph King', position: 'GK', team: ['Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarrenLaChance&backgroundColor=15803d' },
  { id: 'David Samford Rx', name: 'David Samford', position: 'FW', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Rowan Beltzer', name: 'Rowan Beltzer', position: 'DF', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Blade Healen', name: 'Blade Healen', position: 'DF', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Argie Bargie', name: 'Argie Bargie', position: 'DF', team: [ 'Royal Academy Redux','Neo National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Lee Bamboo', name: 'Lee Bamboo', position: 'DF', team: [ 'Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Eton Messer', name: 'Eton Messer', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jonah Spark', name: 'Jonah Spark', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Sue Sparrow', name: 'Sue Sparrow', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Riley Jamm', name: 'Riley Jamm', position: 'FW', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Caleb Stonwall', name: 'Caleb Stonwall', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jimbo Cellar', name: 'Jimbo Cellar', position: 'GK', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Zen Wildhorse', name: 'Zen Wildhorse', position: 'FW', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Dawson Little', name: 'Dawson Little', position: 'DF', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cosimo Beck', name: 'Cosimo Beck', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Maston Color', name: 'Maston Color', position: 'MF', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },

  //Terracota Army
  { id: 'Terracotta Warrior 1', name: 'Terracotta Warrior 1', position: 'GK', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 2', name: 'Terracotta Warrior 2', position: 'DF', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 3', name: 'Terracotta Warrior 3', position: 'DF', team: ['Terracota Army'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 4', name: 'Terracotta Warrior 4', position: 'DF', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 5', name: 'Terracotta Warrior 5', position: 'MF', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 6', name: 'Terracotta Warrior 6', position: 'MF', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 7', name: 'Terracotta Warrior 7', position: 'MF', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 8', name: 'Terracotta Warrior 8', position: 'MF', team: ['Terracota Army'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 9', name: 'Terracotta Warrior 9', position: 'MF', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 10', name: 'Terracotta Warrior 10', position: 'MF', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 11', name: 'Terracotta Warrior 11', position: 'FW', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },

  //The Aquatic Wings
  { id: 'Sting Xiang', name: 'Sting Xiang', position: 'MF', team: ['The Aquatic Wings'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },

  //Eternal Light
  { id: 'Albion Lumina', name: 'Albion Lumina', position: 'GK', team: ['Eternal Light', 'Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight1&backgroundColor=b45309' },
  { id: 'Candido Glow', name: 'Candido Glow', position: 'DF', team: ['Eternal Light','Team Zero'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight2&backgroundColor=ea580c' },
  { id: 'Dwight Whittaker', name: 'Dwight Whittaker', position: 'DF', team: ['Eternal Light','Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Beamer Daye', name: 'Beamer Daye', position: 'DF', team: ['Eternal Light', 'Team Zero'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'ChanFWer Blanc', name: 'ChanFWer Blanc', position: 'DF', team: ['Eternal Light'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Beacon Noor', name: 'Beacon Noor', position: 'MF', team: ['Eternal Light'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Dawntavius Spectrum', name: 'Dawntavius Spectrum', position: 'MF', team: ['Eternal Light','Team Zero'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Brighton Spark', name: 'Brighton Spark', position: 'MF', team: ['Eternal Light'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Laban Lux', name: 'Laban Lux', position: 'MF', team: ['Eternal Light'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Filbert Wiessman', name: 'Filbert Wiessman', position: 'FW', team: ['Eternal Light'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Bailong', name: 'Bailong', position: 'FW', team: ['Eternal Light','Tema Zero','Chrono Storm','Japanese Resistance'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Bailong MM', name: 'Bailong', position: 'FW', team: ['Eternal Light','Tema Zero','Chrono Storm','Japanese Resistance'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  
  //inazuma National 
  { id: 'Shawn Froste', name: 'Shawn Froste', position: 'FW', team: ['Inazuma National','Alpino'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Scott Banyan', name: 'Scott Banyan', position: 'DF', team: ['Inazuma National','Claustro Sagrado'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Darren LaChance', name: 'Darren LaChance', position: 'GK', team: ['Inazuma National','Fauxshore'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Hurley Kane', name: 'Hurley Kane', position: 'DF', team: ['Inazuma National', 'Mary Times'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Thor Stoutberg', name: 'Thor Stoutberg', position: 'MF', team: ['Inazuma National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Austin Hobbes', name: 'Austin Hobbes', position: 'FW', team: ['Inazuma National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Archer Hawkins', name: 'Archer Hawkins', position: 'DF', team: ['Inazuma National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Xavier Foster', name: 'Xavier Foster', position: 'FW', team: ['Inazuma National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Jordan Greenway', name: 'Jordan Greenway', position: 'MF', team: ['Inazuma National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Caleb Stonewall', name: 'Caleb Stonewall', position: 'MF', team: ['Inazuma National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },

  //Inazuma Legends National
  { id: 'Mark Evans A', name: 'Mark Evans', position: 'GK', team: ['Inazuma Legends National'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkEvans&backgroundColor=0ea5e9' },
  { id: 'Jack Wallside A', name: 'Jack Wallside', position: 'DF', team: ['Inazuma Legends National'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JackWallside&backgroundColor=a16207' },
  { id: 'Nathan Swift A', name: 'Nathan Swift', position: 'DF', team: ['Inazuma Legends National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwift&backgroundColor=06b6d4' },
  { id: 'Xavier Schiller', name: 'Xavier Schiller', position: 'FW', team: ['Inazuma Legends National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Caleb Stonewall A', name: 'Caleb Stonewall', position: 'MF', team: ['Inazuma Legends National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Shawn Froste A', name: 'Shawn Froste', position: 'FW', team: ['Inazuma Legends National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Hurley Kane A', name: 'Hurley Kane', position: 'DF', team: ['Inazuma Legends National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShinsukeNishizono&backgroundColor=7c3aed' },
  { id: 'Jude Sharp A', name: 'Jude Sharp', position: 'MF', team: ['Inazuma Legends National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'David Samford A', name: 'David Samford', position: 'FW', team: ['Inazuma Legends National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Kevin Dragonfly A', name: 'Kevin Dragonfly', position: 'FW', team: ['Inazuma Legends National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KevinDragonfly&backgroundColor=ef4444' },
  { id: 'Axel Blaze A', name: 'Axel Blaze', position: 'FW', team: ['Inazuma Legends National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AxelBlaze&backgroundColor=fb923c' },
 
  //Epsilon
  { id: 'Dvalin', name: 'Dvalin', position: 'GK', team: ['Epsilon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Kenville', name: 'Kenville', position: 'DF', team: ['Epsilon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Mole', name: 'Mole', position: 'DF', team: ['Epsilon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Kayson', name: 'Kayson', position: 'DF', team: ['Epsilon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Tytan', name: 'Tytan', position: 'DF', team: ['Epsilon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Fedora', name: 'Fedora', position: 'MF', team: ['Epsilon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Krypto', name: 'Krypto', position: 'MF', team: ['Epsilon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Sworm', name: 'Swoem', position: 'MF', team: ['Epsilon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Mercury', name: 'Mercury', position: 'FW', team: ['Epsilon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Metron', name: 'Metron', position: 'FW', team: ['Epsilon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },
  { id: 'Zell', name: 'Zell', position: 'FW', team: ['Epsilon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon1&backgroundColor=4b5563' },

  //El Dorado 02
  { id: 'Mecha-Mark', name: 'Mecha-Mark', position: 'GK', team: ['El Dorado 02'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkEvans&backgroundColor=0ea5e9' },
  
  //Acient Darkness
  { id: 'Nero Night', name: 'Nero Night', position: 'GK', team: ['Ancient Darkness'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Morris Moore', name: 'Morris Moore', position: 'DF', team: ['Ancient Darkness'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Jet Onix', name: 'Jet Onix', position: 'DF', team: ['Ancient Darkness'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Cole Ebony', name: 'Cole Ebony', position: 'DF', team: ['Ancient Darkness'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Blake Obscura', name: 'Blake Obscura', position: 'DF', team: ['Ancient Darkness','Tema Zero'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Shady Shwartz', name: 'Shady Shwartz', position: 'MF', team: ['Ancient Darkness','Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Goth Grimshaw', name: 'Goth Grimshaw', position: 'MF', team: ['Ancient Darkness'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Duff Dooley', name: 'Duff Dooley', position: 'MF', team: ['Ancient Darkness'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Tynan Crowe', name: 'Tynan Crowe', position: 'MF', team: ['Ancient Darkness','Team Zero'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Teazcat', name: 'Tezcat', position: 'FW', team: ['Ancient Darkness','Team Zero'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },
  { id: 'Yang', name: 'Yang', position: 'FW', team: ['Ancient Darkness','Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarkGeneral&backgroundColor=18181b' },

  //Orfeo

  { id: 'Gigi Blasi', name: 'Gigi Blasi', position: 'GK', team: ['Orfeo'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Vento Galliano', name: 'Vento Galliano', position: 'DF', team: ['Orfeo'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Ottorino Nobili', name: 'Ottorino Nobili', position: 'DF', team: ['Orfeo'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Marco Maserati', name: 'Marco Maserati', position: 'DF', team: ['Orfeo'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Angelo Gabrini', name: 'Angelo Gabrini', position: 'MF', team: ['Orfeo'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Gianluca Zanardi', name: 'Gianluca Zanardi', position: 'MF', team: ['Orfeo'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Giorgio Giannini', name: 'Giorgio Giannini', position: 'MF', team: ['Orfeo'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Dante Diavolo', name: 'Dante Diavolo', position: 'MF', team: ['Orfeo'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Paolo Bianchi', name: 'Paolo Bianchi', position: 'FW', team: ['Orfeo'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Raffaele Generani', name: 'Raffaele Generani', position: 'FW', team: ['Orfeo'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Daniele Sanctis', name: 'Orfeo', position: 'GK', team: ['Orfeo'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Enrico Oliviero', name: 'Enrico Oliviero', position: 'MF', team: ['Orfeo'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Alessandro Rossa', name: 'Alessandro Rossa', position: 'MF', team: ['Orfeo'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },
  { id: 'Giuseppe Cannavaro', name: 'Giuseppe Cannavaro', position: 'DF', team: ['Orfeo'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Orfeo&backgroundColor=065f46' },

  //Gahl
  { id: 'Fei Rune', name: 'Fei Rune', position: 'FW', team: ['Gahl','Chrono Stone','The Sherwins'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Chitoh', name: 'Chitoh', position: 'GK', team: ['Gahl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Kazach', name: 'Kazach', position: 'DF', team: ['Gahl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Fumh', name: 'Fumh', position: 'DF', team: ['Gahl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Gumille', name: 'Gumille', position: 'DF', team: ['Gahl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Yurkeh', name: 'Yurkeh', position: 'MF', team: ['Gahl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Rokah', name: 'Rokah', position: 'MF', team: ['Gahl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Pinoh', name: 'Pinoh', position: 'MF', team: ['Gahl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Tahk', name: 'Tahk', position: 'MF', team: ['Gahl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Dekih', name: 'Dekih', position: 'FW', team: ['Gahl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Yuh', name: 'Yuh', position: 'FW', team: ['Gahl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Bhabass', name: 'Bhabass', position: 'GK', team: ['Gahl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Sheenai', name: 'Sheenai', position: 'DF', team: ['Gahl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Tessell', name: 'Tessell', position: 'MF', team: ['Gahl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Chikka', name: 'Chikka', position: 'MF', team: ['Gahl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Mahrsa', name: 'Mahrsa', position: 'FW', team: ['Gahl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Fei Rune MM1', name: 'Fei Rune', position: 'FW', team: ['Gahl','Chrono Stone','The Sherwins'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },
  { id: 'Fei Rune MM2', name: 'Fei Rune', position: 'FW', team: ['Gahl','Chrono Stone','The Sherwins'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gahl&backgroundColor=374151' },

  //Gihl

  { id: 'Bhufa', name: 'Bhufa', position: 'GK', team: ['Gihl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Zohtan', name: 'Zohtan', position: 'DF', team: ['Gihl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Mustah', name: 'Mustah', position: 'DF', team: ['Gihl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Mohrir', name: 'Mohrir', position: 'DF', team: ['Gihl'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Ghimus', name: 'Ghimus', position: 'MF', team: ['Gihl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Tzeikh', name: 'Tzeikh', position: 'MF', team: ['Gihl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Miehd', name: 'Miehd', position: 'MF', team: ['Gihl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Mehr', name: 'Mehr', position: 'MF', team: ['Gihl','Ragnah'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Ghiris', name: 'Ghiris', position: 'MF', team: ['Gihl','Ragnah'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Chell', name: 'Chell', position: 'FW', team: ['Gihl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Zetoh', name: 'Zetoh', position: 'FW', team: ['Gihl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Enimaux', name: 'Enimaux', position: 'GK', team: ['Gihl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Darehn', name: 'Darehn', position: 'DF', team: ['Gihl'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Mabhi', name: 'Mabhi', position: 'MF', team: ['Gihl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Nahrje', name: 'Nahrje', position: 'MF', team: ['Gihl'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },
  { id: 'Veneth', name: 'Veneth', position: 'FW', team: ['Gihl'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gihl&backgroundColor=1f2937' },

  //The Crimson Hounds

  { id: 'Redd Hazzard', name: 'Redd Hazzard', position: 'FW', team: ['The Crimson Hounds'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CrimsonHounds&backgroundColor=b91c1c' },

  //Chrono Storm

  { id: 'Sor', name: 'Sor', position: 'DF', team: ['Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChronoStorm&backgroundColor=1e40af' },
  { id: 'SorMM', name: 'Sor', position: 'DF', team: ['Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChronoStorm&backgroundColor=1e40af' },

  //The Golden Bears
  { id: 'Goldus Janque', name: 'Goldus Janque', position: 'GK', team: ['The Golden Bears'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoldenBears&backgroundColor=fbbf24' },

  //Southern Claw
  { id: 'Xavier Shotwell', name: 'Xavier Shotwell', position: 'GK', team: ['Southern Claw','Demons Horn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Crimson Wiseman', name: 'Crimson Wiseman', position: 'DF', team: ['Southern Claw','Demons Horn'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Linden Haregrove', name: 'Linden Haregrove', position: 'DF', team: ['Southern Claw','Demons Horn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Jared Dapplegrey', name: 'Jared Dapplegrey', position: 'DF', team: ['Southern Claw'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Keith Wellington', name: 'Keith Wellington', position: 'DF', team: ['Southern Claw','Demons Horn'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Cirrus Whisp', name: 'Cirrus Whisp', position: 'MF', team: ['Southern Claw','Demons Horn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Gamal Everlast', name: 'Gamal Everlast', position: 'MF', team: ['Southern Claw'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Sandy Dryhill', name: 'Sandy Dryhill', position: 'MF', team: ['Southern Claw','Demons Horn'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Dryden Zephyr', name: 'Dryden Zephyr', position: 'MF', team: ['Southern Claw','Demons Horn'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Solomon Roundhay', name: 'Solomon Roundhay', position: 'FW', team: ['Southern Claw'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },
  { id: 'Harry Dwind', name: 'Harry Dwind', position: 'FW', team: ['Southern Claw','Demons Horn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SouthernClaw&backgroundColor=dc2626' },

  //Zanark Domains
  { id: 'Zanark Avalonic', name: 'Zanark Avalonic', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Zanark Avalonic MM1', name: 'Zanark Avalonic', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Zanark Avalonic MM2', name: 'Zanark Avalonic', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Eka', name: 'Eka', position: 'GK', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Dva', name: 'Dva', position: 'DF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Tyrah', name: 'Tyrah', position: 'DF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Catvari', name: 'Catvari', position: 'DF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Panca', name: 'Panca', position: 'MF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Sas', name: 'Sas', position: 'MF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Sapta', name: 'Sapta', position: 'MF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Asta', name: 'Asta', position: 'MF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Navan', name: 'Navan', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Dasan', name: 'Dasan', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Sata', name: 'Sata', position: 'GK', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Sahasra', name: 'Sahasra', position: 'DF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Ayuta', name: 'Ayuta', position: 'MF', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Laksha', name: 'Laksha', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },
  { id: 'Niyuta', name: 'Niyuta', position: 'FW', team: ['Zanark Domains','Zan','Chrono Storm'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZanarkDomains&backgroundColor=6b21a8' },

  //Zan
  { id: 'Feduhm', name: 'Feduhm', position: 'GK', team: ['Zan'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Tsync', name: 'Tsync', position: 'DF', team: ['Zan'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Driss', name: 'Driss', position: 'DF', team: ['Zan'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Ludeau', name: 'Ludeau', position: 'DF', team: ['Zan'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Dios', name: 'Dios', position: 'MF', team: ['Zan'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Grigham', name: 'Grigham', position: 'MF', team: ['Zan'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Zatang', name: 'Zatang', position: 'MF', team: ['Zan'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Rodh', name: 'Rodh', position: 'MF', team: ['Zan'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Djibz', name: 'Djibz', position: 'MF', team: ['Zan'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Garreau', name: 'Garreau', position: 'MF', team: ['Zan'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Steiyah', name: 'Steiyah', position: 'GK', team: ['Zan'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Mhadoor', name: 'Mhadoor', position: 'DF', team: ['Zan'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Heyze', name: 'Heyze', position: 'MF', team: ['Zan'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Kuhrach', name: 'Kuhrach', position: 'MF', team: ['Zan'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },
  { id: 'Torhm', name: 'Torhm', position: 'FW', team: ['Zan'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zan&backgroundColor=6d28d9' },

  


];

export function getPlayersByFilter(
  search: string,
  position: string,
  team: string,
  element: string
): PlayerData[] {
  return playersDatabase.filter(player => {
    const matchesSearch = search === '' || player.name.toLowerCase().includes(search.toLowerCase());
    const matchesPosition = position === 'all' || player.position === position;
    const matchesTeam = team === 'all' || player.team.includes(team); 
    const matchesElement = element === 'all' || player.element === element;
    
    return matchesSearch && matchesPosition && matchesTeam && matchesElement;
  });
}


export const teams = [...new Set(playersDatabase.flatMap(p => p.team))].sort();
export const elements = ['Fuego', 'Viento', 'Bosque', 'Montaña'];
export const positions = ['GK', 'DF', 'MF', 'FW'];