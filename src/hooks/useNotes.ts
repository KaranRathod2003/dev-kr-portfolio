import useSWR from "swr";

interface NoteListItem {
  _id: string;
  userId: string;
  githubUsername: string;
  githubAvatar: string;
  textPreview: string;
  drawingThumbnail: string | null;
  boardPosition: { x: number; y: number };
  createdAt: string;
  updatedAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useNotes() {
  const { data, error, isLoading, mutate } = useSWR<{ notes: NoteListItem[] }>(
    "/api/notes",
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
    }
  );

  const deleteNote = async (id: string) => {
    await mutate(
      async (current) => {
        const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to delete");
        return {
          notes: (current?.notes || []).filter((n) => n._id !== id),
        };
      },
      {
        optimisticData: (current) => ({
          notes: (current?.notes || []).filter((n) => n._id !== id),
        }),
        rollbackOnError: true,
      }
    );
  };

  const updatePosition = async (id: string, x: number, y: number) => {
    await mutate(
      async (current) => {
        await fetch(`/api/notes/${id}/position`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ x, y }),
        });
        return {
          notes: (current?.notes || []).map((n) =>
            n._id === id ? { ...n, boardPosition: { x, y } } : n
          ),
        };
      },
      {
        optimisticData: (current) => ({
          notes: (current?.notes || []).map((n) =>
            n._id === id ? { ...n, boardPosition: { x, y } } : n
          ),
        }),
        revalidate: false,
      }
    );
  };

  return {
    notes: data?.notes || [],
    error,
    isLoading,
    mutate,
    deleteNote,
    updatePosition,
  };
}
