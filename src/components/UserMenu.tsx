import { LogOutIcon, UserIcon } from 'lucide-react';

import { useGlobal } from '../contexts/GlobalContext';
import { useRenderCounter } from '../hooks/useRenderCounter';

export function UserMenu() {
  useRenderCounter('UserMenu');

  const { user, login, logout } = useGlobal();

  if (!user) {
    return (
      <button
        type="button"
        className="rounded-lg border border-white px-6 py-2 text-sm
          text-white transition-colors hover:bg-white/10"
        onClick={login}
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end gap-1 text-right">
        <span className="block text-sm text-zinc-500">Hello, {user.name}!</span>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-red-500 transition-colors
           hover:text-red-400"
          onClick={logout}
        >
          Log Out <LogOutIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="to-green flex h-10 w-10 items-center justify-center rounded-full
        bg-gradient-to-r from-[#407af6] to-[#c08d41]">
        <UserIcon />
      </div>
    </div>
  );
}
