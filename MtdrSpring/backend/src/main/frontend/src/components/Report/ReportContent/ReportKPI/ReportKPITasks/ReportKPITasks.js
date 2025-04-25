import './ReportKPITasks.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportKPITasks({ KPITasksData = {} }) {
  // Proporcionar valores predeterminados para evitar errores si KPITasksData es undefined
  const tasksToDo = KPITasksData?.tasks_to_do || 0;
  const tasksCompleted = KPITasksData?.tasks_completed || 0;

  // Preparar los datos para el gráfico
  const data = [
    {
      name: 'Tareas',
      'Por hacer': tasksToDo,
      'Completadas': tasksCompleted,
    }
  ];

  // Calcular el total para mostrar el porcentaje de completado
  const total = tasksToDo + tasksCompleted;
  const completionPercentage = total > 0 
    ? Math.round((tasksCompleted / total) * 100) 
    : 0;

  return (
    <div className="report-kpi-tasks-main-container">
      <h2 className="report-kpi-title">Estado de Tareas</h2>
      
      <div className="report-kpi-stats">
        <div className="stat-card todo-card">
          <p className="stat-label">Por hacer</p>
          <p className="stat-value todo-value">{tasksToDo}</p>
        </div>
        
        <div className="stat-card completed-card">
          <p className="stat-label">Completadas</p>
          <p className="stat-value completed-value">{tasksCompleted}</p>
        </div>
        
        <div className="stat-card percentage-card">
          <p className="stat-label">Porcentaje</p>
          <p className="stat-value percentage-value">{completionPercentage}%</p>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Por hacer" fill="#3B82F6" />
            <Bar dataKey="Completadas" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}