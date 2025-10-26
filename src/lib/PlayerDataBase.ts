export interface PlayerData {
  id: string;
  name: string;
  position: 'Portero' | 'Defensa' | 'Mediocampo' | 'Delantero';
  team: string;
  element: 'Fuego' | 'Viento' | 'Bosque' | 'Montaña';
  avatar: string;
}

export const playersDatabase: PlayerData[] = [
  // Raimon
  { id: 'endou', name: 'Mark Evans', position: 'Portero', team: 'Raimon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarkEvans&backgroundColor=0ea5e9' },
  { id: 'kabeyama', name: 'Jack Wallside', position: 'Defensa', team: 'Raimon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JackWallside&backgroundColor=a16207' },
  { id: 'tsunami', name: 'Nathan Swift', position: 'Defensa', team: 'Raimon', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwift&backgroundColor=06b6d4' },
  { id: 'kazemaru', name: 'Nathan Swift Jr', position: 'Defensa', team: 'Raimon', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NathanSwiftJr&backgroundColor=0891b2' },
  { id: 'touko', name: 'Silvia Woods', position: 'Defensa', team: 'Raimon', element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SilviaWoods&backgroundColor=16a34a' },
  { id: 'kidou', name: 'Jude Sharp', position: 'Mediocampo', team: 'Raimon', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JudeSharp&backgroundColor=1e3a8a' },
  { id: 'fubuki', name: 'Shawn Frost', position: 'Mediocampo', team: 'Raimon', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ShawnFrost&backgroundColor=0284c7' },
  { id: 'someoka', name: 'Kevin Dragonfly', position: 'Mediocampo', team: 'Raimon', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KevinDragonfly&backgroundColor=ef4444' },
  { id: 'gouenji', name: 'Axel Blaze', position: 'Delantero', team: 'Raimon', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AxelBlaze&backgroundColor=fb923c' },
  { id: 'hiroto', name: 'Xavier Foster', position: 'Delantero', team: 'Raimon', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=XavierFoster&backgroundColor=dc2626' },
  { id: 'toramaru', name: 'Bobby Shearer', position: 'Delantero', team: 'Raimon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BobbyShearer&backgroundColor=fbbf24' },

  // Royal Academy
  { id: 'tachimukai', name: 'Darren LaChance', position: 'Portero', team: 'Royal Academy', element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DarrenLaChance&backgroundColor=15803d' },
  { id: 'kogure', name: 'Sam Kincaid', position: 'Defensa', team: 'Royal Academy', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamKincaid&backgroundColor=78716c' },
  { id: 'sakuma', name: 'David Samford', position: 'Mediocampo', team: 'Royal Academy', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidSamford&backgroundColor=1e40af' },
  { id: 'jimon', name: 'Jordan Greenway', position: 'Defensa', team: 'Royal Academy', element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanGreenway&backgroundColor=166534' },

  // Alien Academy
  { id: 'midorikawa', name: 'Ryoma Midorikawa', position: 'Mediocampo', team: 'Alien Academy', element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RyomaMidorikawa&backgroundColor=22c55e' },
  { id: 'saginuma', name: 'Joseph King', position: 'Portero', team: 'Alien Academy', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JosephKing&backgroundColor=ea580c' },
  { id: 'burn', name: 'Bryce Withingale', position: 'Delantero', team: 'Alien Academy', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BryceWithingale&backgroundColor=f97316' },
  { id: 'gazelle', name: 'Byron Love', position: 'Mediocampo', team: 'Alien Academy', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ByronLove&backgroundColor=fbbf24' },

  // Zeus
  { id: 'aphrodi', name: 'Aphrodi', position: 'Delantero', team: 'Zeus', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aphrodi&backgroundColor=d946ef' },
  { id: 'poseidon', name: 'Poseidon', position: 'Defensa', team: 'Zeus', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Poseidon&backgroundColor=0891b2' },
  { id: 'hermes', name: 'Hermes', position: 'Mediocampo', team: 'Zeus', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hermes&backgroundColor=a855f7' },

  // Epsilon
  { id: 'desarm', name: 'Desarm', position: 'Portero', team: 'Epsilon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Desarm&backgroundColor=64748b' },
  { id: 'epsilon1', name: 'Epsilon 01', position: 'Defensa', team: 'Epsilon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon01&backgroundColor=475569' },
  { id: 'epsilon2', name: 'Epsilon 02', position: 'Mediocampo', team: 'Epsilon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Epsilon02&backgroundColor=334155' },

  // The Genesis
  { id: 'genesis1', name: 'Genesis 01', position: 'Defensa', team: 'The Genesis', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis01&backgroundColor=7c2d12' },
  { id: 'genesis2', name: 'Genesis 02', position: 'Mediocampo', team: 'The Genesis', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis02&backgroundColor=991b1b' },
  { id: 'genesis3', name: 'Genesis 03', position: 'Delantero', team: 'The Genesis', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Genesis03&backgroundColor=b91c1c' },

  // Otros jugadores populares
  { id: 'kogure2', name: 'Tod Ironside', position: 'Defensa', team: 'Raimon', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TodIronside&backgroundColor=92400e' },
  { id: 'matsuno', name: 'Max Cannon', position: 'Mediocampo', team: 'Raimon', element: 'Fuego', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaxCannon&backgroundColor=f59e0b' },
  { id: 'handa', name: 'Jim Wraith', position: 'Defensa', team: 'Raimon', element: 'Bosque', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimWraith&backgroundColor=14532d' },
  { id: 'ichinose', name: 'Austin Hobbes', position: 'Delantero', team: 'Unicorn', element: 'Viento', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AustinHobbes&backgroundColor=0c4a6e' },
  { id: 'domon', name: 'Domon Asuka', position: 'Defensa', team: 'Unicorn', element: 'Montaña', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DomonAsuka&backgroundColor=713f12' },
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
    const matchesTeam = team === 'all' || player.team === team;
    const matchesElement = element === 'all' || player.element === element;
    
    return matchesSearch && matchesPosition && matchesTeam && matchesElement;
  });
}

export const teams = [...new Set(playersDatabase.map(p => p.team))].sort();
export const elements = ['Fuego', 'Viento', 'Bosque', 'Montaña'];
export const positions = ['Portero', 'Defensa','Mediocampo', 'Delantero'];