using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace trunk.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make 1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make 2')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) VALUES('Make 3')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make1-Model A',1)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make1-Model B',1)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make1-Model C',1)");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model A',2)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model B',2)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model C',2)");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model A',3)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model B',3)");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make2-Model C',3)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes");
            //migrationBuilder.Sql("INSERT INTO Models (Name, MakeID) VALUES('Make1-Model A',3)");
        }
    }
}
