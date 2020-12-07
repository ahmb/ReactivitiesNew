using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistance.Migrations
{
    public partial class updatedactivityprivateimage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "EndDate",
                table: "Activities",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Activities",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Private",
                table: "Activities",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Private",
                table: "Activities");
        }
    }
}
