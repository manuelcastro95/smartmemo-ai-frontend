import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { getMeetings } from '../services/meetingService';

const DashboardCard = ({ title, value, description, icon, linkTo, color }) => (
  <Link to={linkTo} className="transform transition-all hover:scale-105">
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center">
          <div className={`rounded-full p-3 ${color}`}>
            {icon}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="flex items-baseline">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="ml-2 text-sm text-gray-500">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState({
    meetings: 0,
    transcriptions: 0,
    notes: 0,
    pendingMeetings: 0
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const meetings = await getMeetings();
      // Aquí puedes agregar más llamadas a la API para obtener otras estadísticas

      setStats({
        meetings: meetings.length,
        transcriptions: 15, // Ejemplo: reemplazar con datos reales
        notes: 25, // Ejemplo: reemplazar con datos reales
        pendingMeetings: meetings.filter(m => new Date(m.scheduledTime) > new Date()).length
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Bienvenido de nuevo, {user?.name}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Meetings Card */}
            <DashboardCard
              title="Reuniones"
              value={stats.meetings}
              description="Total"
              linkTo="/meetings"
              color="bg-blue-100 text-blue-600"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              }
            />

            {/* Pending Meetings Card */}
            <DashboardCard
              title="Pendientes"
              value={stats.pendingMeetings}
              description="Por realizar"
              linkTo="/meetings"
              color="bg-yellow-100 text-yellow-600"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />

            {/* Transcriptions Card */}
            <DashboardCard
              title="Transcripciones"
              value={stats.transcriptions}
              description="Realizadas"
              linkTo="/transcriptions"
              color="bg-green-100 text-green-600"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
            />

            {/* Notes Card */}
            <DashboardCard
              title="Notas"
              value={stats.notes}
              description="Guardadas"
              linkTo="/notes"
              color="bg-purple-100 text-purple-600"
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            />
          </div>

          {/* Gráficos */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
              {/* Contenido */}
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4">Estadísticas</h3>
              {/* Contenido */}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Manuel Castro. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
