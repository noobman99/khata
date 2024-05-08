import "../css/Friend.css";

export default function Friend() {
  return (
    <div className="friend">
      <div className="friend-profile">
        <img
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAABgUHAQMEAv/EADUQAAIBAwIDBAgEBwAAAAAAAAABAgMEEQUhBhIxE0GBkTJRYWJxobHhFCNCwSIkQ1JTg/D/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3KAAAAAAAAAAPms5xg+ySc+7J56NS7lNdrTjCPf7fmeoAAAAAAAAAAAAAAAAAAAAAAA6q11b2+O3rU6eenPJIw/EGuOxf4e2SddrLk/0fckK1WpXqOpVnKcn1cnlgX15q9lZ0lUqVoz5vRjTeWzDz4tipfl2bcfeqb/QlvAAXFjxHY3WI1JOhN91R7PxMummk4tNPo0awMjper3OnzSjJzo99KT28PUBfA6LK7pXttGvQbcZdz6p+pneAAAAAAAAAAAAAADk4Dzh469wGuNQrO4vriq9+ao3/wB4YPOczTU5KXVNnAAAAAABT8F1nzXNu3thTj9GVBH8GpvUKz7lS38ywAAAAAAAAAAAAAAByupwdN8pOyuFD0nTljyAhdbp06ep1+wnGdOUuZcrzhvqjwDHtyAAAAAACu4Nt+S0rXLW9SXKn7F92UJJ8GzqO6rQc5OkqeeXOyeSsAAAAAAAAAAAAAAAAA1/rNhOyvq0Iwl2KeYyxth9NzwGxNVtvxmnV6CW7jmPxW6NeNY2fVAcAAAAZPh20d3qlLK/Lp/xz+C6fPAGd4PtHSs6lxNNOtLC+C+5nwkkkkkkumAAAAAAAAAAAAAAAAAAIHiCjChq9xGntFvmx6m9y+clFOUnhJbtmvNXuY3epXFaHoSm+X4LZAeMAAC34XtadHS4VY+nWfNJ/JIiC04TuoVdN7DK7SlJrHsff9QM2AAAAAAAAAAAAAA8l9qVpYr+YrRjLGVBbyfgT99xVUnmNlSVNf5JvL8gKqc404805RjH1t4MXe8QWFsmoVe2n/bT3+ZF3N1cXcua4rTqP3n+x0gZPU9autQzBvs6L/pxfX4+sxgAAAADsoVqtvUVSjNwnHpKLwzrAFRp3FKwqeoQ/wBsF9UZ62v7S6S/D3FObfcpb+RrkLZpptNd+QNnghLHXr6zxHte1pr9FTf5lBY8S2dxiNfNvP3nmPmBmwcRlGcVKElKL3TTymcgAAAPFrF8tPsZ1us+lNetntJPjK45rihbxe0Iub+L2An6tWpXqSq1Zuc5PLk+8+AAAAAAAAAAAAAAAAAAM9wvqkre5jaVZN0arxFP9MixNYxbjJSi8NPKNk2lZXFtRrR6TgpfIDtAAAgNer9vq1xJPKjLlXhsXlaoqNKdV9IRcvI1rObnOU31k234gfIAAAAAAAAAAAAAAAAAAFxwrX7bSIRzvSk4P6/uQ5TcF1v4rmg31SmvoBUgADwa/Jx0e6cXh8mPNkDgAAAAAAAAAAAAAAAAAAAABl+FJOOrwSe0oST8sgAWwAA//9k="
          alt=""
        />
        <div>
          <h3>John Doe</h3>
          <p>#USR1234567</p>
        </div>
      </div>
      <div className="friend-controls">
        <button className="button-red">Remove</button>
        <button className="button-blue">View</button>
      </div>
    </div>
  );
}
