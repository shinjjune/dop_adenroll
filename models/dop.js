module.exports = (sequelize, Sequelize) => {
    return sequelize.define('dop', {
      title: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyAddress: {
        type: Sequelize.STRING,
        allowNull: false
      },
      companyURL: {
        type: Sequelize.STRING,
        allowNull: false
      },
      managerName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      managerEamil1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      maganerEamil2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      missionCondition: {
        type: Sequelize.STRING,
        allowNull: true
      },
      missionUserNum: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false
      },
      inputGroupFile: {
        type: Sequelize.STRING, // binary??
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },endDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      survey: {
        type: Sequelize.STRING,
        allowNull: true
      },
    });
  }