export default function PushToast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 bg-blue-600 text-white
                    px-4 py-2 rounded-lg shadow-lg
                    animate-bounce z-50">
      {message}
    </div>
  );
}
