export interface PlayerData {
  id: string;
  name: string;
  position: 'Portero' | 'Defensa' | 'Mediocampo' | 'Delantero';
  team: string[]; 
  element: 'Fuego' | 'Viento' | 'Bosque' | 'Montaña';
  avatar: string;
}

export const playersDatabase: PlayerData[] = [
  // Raimon
  { id: 'Mark Evans', name: 'Mark Evans', position: 'Portero', team: ['Raimon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkEvans&backgroundColor=0ea5e9' },
  { id: 'Jack Wallside', name: 'Jack Wallside', position: 'Defensa', team: ['Raimon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JackWallside&backgroundColor=a16207' },
  { id: 'Nathan Swift', name: 'Nathan Swift', position: 'Defensa', team: ['Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwift&backgroundColor=06b6d4' },
  { id: 'Jim Wraith', name: 'Jim Wraith', position: 'Defensa', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwiftJr&backgroundColor=0891b2' },
  { id: 'Tod Ironside', name: 'Tod Ironside', position: 'Defensa', team: ['Raimon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SilviaWoods&backgroundColor=16a34a' },
  { id: 'Steve Grim', name: 'Steve Grim', position: 'Mediocampo', team: ['Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Kevin Dragonfly', name: 'Kevin Dragonfly', position: 'Delantero', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KevinDragonfly&backgroundColor=ef4444' },
  { id: 'Axel Blaze', name: 'Axel Blaze', position: 'Delantero', team: ['Raimon', 'Kirkwood'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AxelBlaze&backgroundColor=fb923c' },
  { id: 'Sam Kincaid', name: 'Sam Kincaid', position: 'Mediocampo', team: ['Raimon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=XavierFoster&backgroundColor=dc2626' },
  { id: 'Bobby Shearer', name: 'Bobby Shearer', position: 'Defensa', team: ['Raimon', 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BobbyShearer&backgroundColor=fbbf24' },
  { id: 'Erik Eagle', name: 'Erik Eagle', position: 'Mediocampo', team: ['Raimon', 'Unicorn'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TodIronside&backgroundColor=92400e' },
  { id: 'Maxwell Carson', name: 'Maxwell Carson', position: 'Delantero', team: ['Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaxCannon&backgroundColor=f59e0b' },
  { id: 'Shadow Cimmerian', name: 'Shadow Cimmerian', position: 'Delantero', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimWraith&backgroundColor=14532d' },
  { id: 'Tim Saunders', name: 'Tim Saunders', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'William Glass', name: 'William Glass', position: 'Delantero', team: ['Raimon'], element: 'Bosque', avatar: 'https://inazuma.fandom.com/es/wiki/William_Glass' },
  { id: 'Talon Lewis', name: 'Talon Lewis', position: 'Delantero', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Harper Evans', name: 'Harper Evans', position: 'Delantero', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Darian Moonward', name: 'Darian Moonward', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Eleanor Estrella', name: 'Eleanor Estrella', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Maddock Jackson', name: 'Maddock Jackson', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Colton Sharps', name: 'Colotn Sharps', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Jazmine Carmine', name: 'Jazmine Carmine', position: 'Mediocampo', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Boone Wretman', name: 'Boone Wretman', position: 'Defensa', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Clement Mariner', name: 'Clement Mariner', position: 'Defensa', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Viorain Maleby', name: 'Viorain Maleby', position: 'Defensa', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'Zander Warmington', name: 'Zander Warmington', position: 'Portero', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },

  //Raimon First Squad
  { id: 'Arion Sherwind', name: 'Arion Sherwind', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Victor Blade', name: 'Victor Blade', position: 'Delantero', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Riccardo Di Rigo', name: 'Riccardo Di Rigo', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Jean-Pierre Lapin', name: 'Jean-Pierre Lapin', position: 'Portero', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Gabriel Garcia', name: 'Gabriel Garcia', position: 'Defensa', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Samguk Han', name: 'Samguk Han', position: 'Portero', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Subaru Honda', name: 'Subaru Honda', position: 'Defensa', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Wanli Changcheng', name: 'Wanli Changcheng', position: 'Defensa', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Adé Kébé', name: 'Adé Kébé', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Eugene Peabody', name: 'Eugene Peabody', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Michael Ballzack', name: 'Michael Ballzack', position: 'Delantero', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Doug McArthur', name: 'Doug McArthur', position: 'Delantero', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Aitor Cazador', name: 'Aitor Cazador', position: 'Defensa', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Ryoma Nishiki', name: 'Ryoma Nishiki', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Lucian Dark', name: 'Lucian Dark', position: 'Delantero', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Lars Dijkstra', name: 'Lars Dijkstra', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Sven Johansson', name: 'Sven Johansson', position: 'Defensa', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Shunsuke Aoyama', name: 'Shunsuke Aoyama', position: 'Mediocampo', team: ['Raimon First Squad','Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Hugues Baudet', name: 'Hugues Baudet', position: 'Mediocampo', team: ['Raimon First Squad','Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Goldie Lemon', name: 'Goldie Lemon', position: 'Defensa', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Goldie Lemon MM', name: 'Goldie Lemon', position: 'Defensa', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Arion Sherwind MM1', name: 'Arion Sherwind', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Victor Blade MM', name: 'Victor Blade', position: 'Delantero', team: ['Raimon First Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Riccardo Di Rigo MM', name: 'Riccardo Di Rigo', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Jean-Pierre Lapin MM', name: 'Jean-Pierre Lapin', position: 'Portero', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Gabriel Garcia MM', name: 'Gabriel Garcia', position: 'Defensa', team: ['Raimon First Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Arion Sherwind MM2', name: 'Arion Sherwind', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'Ryoma Nishiki MM', name: 'Ryoma Nishiki', position: 'Mediocampo', team: ['Raimon First Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },

  //Raimon Second Squad
{ id: 'Montaña Tabano', name: 'Montaña Tabano', position: 'Portero', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Tom Gato', name: 'Tom Gato', position: 'Defensa', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Joaquin Coronado', name: 'Joaquin Coronado', position: 'Defensa', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Connant Ó Briain', name: 'Connant Ó Briain', position: 'Defensa', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Sirius Starsky', name: 'Sirius Starsky', position: 'Defensa', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Bucky Woodchuck', name: 'Bucky Woodchuck', position: 'Mediocampo', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Punkie Mahican', name: 'Punkie Mahican', position: 'Mediocampo', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Jagur Meister', name: 'Jagur Meister', position: 'Delantero', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Friedrich Schiller', name: 'Friedrich Schiller', position: 'Delantero', team: ['Raimon Second Squad'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Adarn Shame', name: 'Adarn Shame', position: 'Portero', team: ['Raimon Second Squad'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ota Shape', name: 'Ota Shape', position: 'Defensa', team: ['Raimon Second Squad'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Nogo Sarikid', name: 'Nogo Sarikid', position: 'Mediocampo', team: ['Raimon Second Squad'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },

//Raimon Veterans
{ id: 'Seymour Hillman', name: 'Seymour Hillman', position: 'Portero', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Charles Island', name: 'Charles Island', position: 'Defensa', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Garret Hairtown', name: 'Garret Hairtown', position: 'Defensa', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Arthur Sweet', name: 'Arthur Sweet', position: 'Defensa', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Peter Mildred', name: 'Peter Mildred', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Josh Nathaniel', name: 'Josh Nathaniel', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Edward Gladstone', name: 'Edward Gladstone', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Tyler Thomas', name: 'Tyler Thomas', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Joseph Yosemite', name: 'Joseph Yosemite', position: 'Delantero', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ian Sufolk', name: 'Ian Sufolk', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Constant Builder', name: 'Constant Builder', position: 'Delantero', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Ted Poe', name: 'Ted Poe', position: 'Delantero', team: ['Raimon Veterans'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Marshall Heart', name: 'Marshall Heart', position: 'Delantero', team: ['Raimon Veterans'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Don Foreman', name: 'Don Foreman', position: 'Mediocampo', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Slot MacHines', name: 'Slot MacHines', position: 'Defensa', team: ['Raimon Veterans'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
{ id: 'Bill Steakspear', name: 'Bill Steakspear', position: 'Defensa', team: ['Raimon Veterans'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },


  // Royal Academy
  { id: 'Jude Sharp', name: 'Jude Sharp', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Joseph King', name: 'Joseph King', position: 'Portero', team: ['Royal Academy','Neo National'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarrenLaChance&backgroundColor=15803d' },
  { id: 'Peter Drent', name: 'Peter Drent', position: 'Defensa', team: ['Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamKincaid&backgroundColor=78716c' },
  { id: 'Ben Simmons', name: 'Ben Simmons', position: 'Defensa', team: ['Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidSamford&backgroundColor=1e40af' },
  { id: 'Alan Master', name: 'Alan Master', position: 'Mediocampo', team: ['Royal Academy','Neo National'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanGreenway&backgroundColor=166534' },
  { id: 'Gus Martin', name: 'Gus Martin', position: 'Defensa', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Herman Waldon', name: 'Herman Waldon', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jhon Bloom', name: 'Jhon BLoom', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Derek Swing', name: 'Derek Swing', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Daniel Hatch', name: 'Daniel Hatch', position: 'Delantero', team: [ 'Royal Academy','Neo National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'David Samford', name: 'David Samford', position: 'Delantero', team: [ 'Royal Academy','Inazuma National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Bob Carlton', name: 'Bob Carlton', position: 'Portero', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cliff Tomlinson', name: 'Cliff Tomlinson', position: 'Delantero', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jim Lawrenson', name: 'Jim Lawrenson', position: 'Delantero', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Barry Pots', name: 'Barry Pots', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Steve Ingham', name: 'Steve Ingham', position: 'Delantero', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Preston Princeton', name: 'Preston Priceton', position: 'Portero', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Dracon Yale', name: 'Dracon Yale', position: 'Defensa', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Duke Dartmouth', name: 'Duke Dartmouth', position: 'Defensa', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cameron Cambridge', name: 'Camberon Cambridge', position: 'Defensa', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Earl Eton', name: 'Earl Eton', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Caesar Cornell', name: 'Caesar Cornell', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Hampton Harvard', name: 'Hampton Harvard', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Baron Oxford', name: 'Baron Oxford', position: 'Defensa', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Sterling Stanford', name: 'Sterling Stanford', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Colby Columbia', name: 'Colby Columbia', position: 'Delantero', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Rex Remington', name: 'Rex Remington', position: 'Delantero', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Fred Featherstonhaugh', name: 'Fred Featherstonhaugh', position: 'Portero', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Arthur Ascot', name: 'Arthur Ascot', position: 'Defensa', team: [ 'Royal Academy'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Stuart St John', name: 'Stuart St John', position: 'Defensa', team: [ 'Royal Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Wenceslas Wales', name: 'Wenceslas Wales', position: 'Delantero', team: [ 'Royal Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Yorick York', name: 'Yorick York', position: 'Mediocampo', team: [ 'Royal Academy'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },

  //Royal Academy Redux
  { id: 'Joseph King RX', name: 'Joseph King', position: 'Portero', team: ['Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarrenLaChance&backgroundColor=15803d' },
  { id: 'David Samford Rx', name: 'David Samford', position: 'Delantero', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Rowan Beltzer', name: 'Rowan Beltzer', position: 'Defensa', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Blade Healen', name: 'Blade Healen', position: 'Defensa', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Argie Bargie', name: 'Argie Bargie', position: 'Defensa', team: [ 'Royal Academy Redux','Neo National'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Lee Bamboo', name: 'Lee Bamboo', position: 'Defensa', team: [ 'Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Eton Messer', name: 'Eton Messer', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jonah Spark', name: 'Jonah Spark', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Sue Sparrow', name: 'Sue Sparrow', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Riley Jamm', name: 'Riley Jamm', position: 'Delantero', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Caleb Stonwall', name: 'Caleb Stonwall', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Jimbo Cellar', name: 'Jimbo Cellar', position: 'Portero', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Zen Wildhorse', name: 'Zen Wildhorse', position: 'Delantero', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Dawson Little', name: 'Dawson Little', position: 'Defensa', team: [ 'Royal Academy Redux'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Cosimo Beck', name: 'Cosimo Beck', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'Maston Color', name: 'Maston Color', position: 'Mediocampo', team: [ 'Royal Academy Redux'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },

  //Terracota Army
  { id: 'Terracotta Warrior 1', name: 'Terracotta Warrior 1', position: 'Portero', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 2', name: 'Terracotta Warrior 2', position: 'Defensa', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 3', name: 'Terracotta Warrior 3', position: 'Defensa', team: ['Terracota Army'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 4', name: 'Terracotta Warrior 4', position: 'Defensa', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 5', name: 'Terracotta Warrior 5', position: 'Mediocampo', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 6', name: 'Terracotta Warrior 6', position: 'Mediocampo', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 7', name: 'Terracotta Warrior 7', position: 'Mediocampo', team: ['Terracota Army'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 8', name: 'Terracotta Warrior 8', position: 'Mediocampo', team: ['Terracota Army'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 9', name: 'Terracotta Warrior 9', position: 'Mediocampo', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 10', name: 'Terracotta Warrior 10', position: 'Mediocampo', team: ['Terracota Army'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },
  { id: 'Terracotta Warrior 11', name: 'Terracotta Warrior 11', position: 'Delantero', team: ['Terracota Army'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },

  //The Aquatic Wings
  { id: 'Sting Xiang', name: 'Sting Xiang', position: 'Mediocampo', team: ['The Aquatic Wings'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GeneralTerra&backgroundColor=57534e' },

  //Eternal Light
  { id: 'Albion Lumina', name: 'Albion Lumina', position: 'Portero', team: ['Eternal Light', 'Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight1&backgroundColor=b45309' },
  { id: 'Candido Glow', name: 'Candido Glow', position: 'Defensa', team: ['Eternal Light','Team Zero'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight2&backgroundColor=ea580c' },
  { id: 'Dwight Whittaker', name: 'Dwight Whittaker', position: 'Defensa', team: ['Eternal Light','Team Zero'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Beamer Daye', name: 'Beamer Daye', position: 'Defensa', team: ['Eternal Light', 'Team Zero'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Chandler Blanc', name: 'Chandler Blanc', position: 'Defensa', team: ['Eternal Light'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Beacon Noor', name: 'Beacon Noor', position: 'Mediocampo', team: ['Eternal Light'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Dawntavius Spectrum', name: 'Dawntavius Spectrum', position: 'Mediocampo', team: ['Eternal Light','Team Zero'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Brighton Spark', name: 'Brighton Spark', position: 'Mediocampo', team: ['Eternal Light'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Laban Lux', name: 'Laban Lux', position: 'Mediocampo', team: ['Eternal Light'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Filbert Wiessman', name: 'Filbert Wiessman', position: 'Delantero', team: ['Eternal Light'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  { id: 'Bailong', name: 'Bailong', position: 'Delantero', team: ['Eternal Light','Tema Zero','Chrono Storm','Japanese Resistance'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EternalLight3&backgroundColor=f97316' },
  
  // Alien Academy
  { id: 'midorikawa', name: 'Ryoma Midorikawa', position: 'Mediocampo', team: ['Alien Academy'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RyomaMidorikawa&backgroundColor=22c55e' },
  { id: 'saginuma', name: 'Joseph King', position: 'Portero', team: ['Alien Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JosephKing&backgroundColor=ea580c' },
  { id: 'burn', name: 'Bryce Withingale', position: 'Delantero', team: ['Alien Academy'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BryceWithingale&backgroundColor=f97316' },
  { id: 'gazelle', name: 'Byron Love', position: 'Mediocampo', team: ['Alien Academy', 'Zeus'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByronLove&backgroundColor=fbbf24' },

  // Zeus
  { id: 'aphrodi', name: 'Aphrodi', position: 'Delantero', team: ['Zeus', 'Raimon'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aphrodi&backgroundColor=d946ef' },
  { id: 'poseidon', name: 'Poseidon', position: 'Defensa', team: ['Zeus'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Poseidon&backgroundColor=0891b2' },
  { id: 'hermes', name: 'Hermes', position: 'Mediocampo', team: ['Zeus'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hermes&backgroundColor=a855f7' },

  // Epsilon
  { id: 'desarm', name: 'Desarm', position: 'Portero', team: ['Epsilon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Desarm&backgroundColor=64748b' },
  { id: 'epsilon1', name: 'Epsilon 01', position: 'Defensa', team: ['Epsilon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon01&backgroundColor=475569' },
  { id: 'epsilon2', name: 'Epsilon 02', position: 'Mediocampo', team: ['Epsilon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon02&backgroundColor=334155' },

  // The Genesis
  { id: 'genesis1', name: 'Genesis 01', position: 'Defensa', team: ['The Genesis'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis01&backgroundColor=7c2d12' },
  { id: 'genesis2', name: 'Genesis 02', position: 'Mediocampo', team: ['The Genesis'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis02&backgroundColor=991b1b' },
  { id: 'genesis3', name: 'Genesis 03', position: 'Delantero', team: ['The Genesis'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis03&backgroundColor=b91c1c' },

  // Otros jugadores populares
  { id: 'kogure2', name: 'Tod Ironside', position: 'Defensa', team: ['Raimon'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TodIronside&backgroundColor=92400e' },
  { id: 'matsuno', name: 'Max Cannon', position: 'Mediocampo', team: ['Raimon'], element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaxCannon&backgroundColor=f59e0b' },
  { id: 'handa', name: 'Jim Wraith', position: 'Defensa', team: ['Raimon'], element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimWraith&backgroundColor=14532d' },
  { id: 'ichinose', name: 'Austin Hobbes', position: 'Delantero', team: ['Unicorn'], element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'domon', name: 'Domon Asuka', position: 'Defensa', team: ['Unicorn'], element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DomonAsuka&backgroundColor=713f12' },
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
export const positions = ['Portero', 'Defensa', 'Mediocampo', 'Delantero'];