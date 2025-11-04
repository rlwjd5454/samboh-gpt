import { useNavigate } from "react-router-dom";

export default function SelectLevel() {
  const navigate = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-96 text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">과정 선택</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/dashboard/middle")}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            중등 과정
          </button>
          <button
            onClick={() => navigate("/dashboard/elementary")}
            className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all"
          >
            초등 과정
          </button>
        </div>
      </div>
    </main>
  );
}
