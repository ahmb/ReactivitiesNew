using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistance.Migrations
{
    public partial class ProfilePublishandActivityAttendeeComment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ApprovalRequestComment",
                table: "ActivityAttendees",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PublishedToProfile",
                table: "Activities",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalRequestComment",
                table: "ActivityAttendees");

            migrationBuilder.DropColumn(
                name: "PublishedToProfile",
                table: "Activities");
        }
    }
}
