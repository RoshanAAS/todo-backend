

module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed'),
        defaultValue: 'pending',
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      userId: {type:DataTypes.INTEGER,
        references:{
            model:"users",
            key:"id"
        }
        }
    });
  
    return Todo;
  };
  

    //  {
    //     "title":"Lering sequelize",
    //     "description":"all task done",
    //     "status":"pending",
    //      "dueDate":"08/11/2023"
    //  }