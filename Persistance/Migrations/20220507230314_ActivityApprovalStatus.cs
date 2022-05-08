using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class ActivityApprovalStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttendeeCount",
                table: "Activities");

            migrationBuilder.AddColumn<int>(
                name: "ApprovalStatus",
                table: "ActivityAttendees",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalStatus",
                table: "ActivityAttendees");

            migrationBuilder.AddColumn<int>(
                name: "AttendeeCount",
                table: "Activities",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
