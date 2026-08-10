terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Key Pair
resource "aws_key_pair" "deployer_backend" {
  key_name   = "cargo-truck-backend-key"
  public_key = var.public_key
}

# Security Group
resource "aws_security_group" "backend_sg" {
  name        = "backend_sg"
  description = "Allow API and SSH traffic"

  ingress {
    description = "API"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "cargo-truck-backend-sg"
  }
}

# EC2 Instance
resource "aws_instance" "backend_server" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = aws_key_pair.deployer_backend.key_name

  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  # Provision extra space for db if needed
  root_block_device {
    volume_size = 20
  }

  tags = {
    Name = "cargo-truck-backend"
  }
}
